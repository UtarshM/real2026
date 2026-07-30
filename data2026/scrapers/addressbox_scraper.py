import json
import re
from typing import List, Optional, Any
from bs4 import BeautifulSoup
from scrapers.base_scraper import BaseScraper
from models import DeveloperSchema, ProjectSchema, MediaAssetSchema, FloorplanSchema, BrochureSchema, VideoSchema
from pipelines.cleaner import DataCleaner
from pipelines.asset_downloader import AssetDownloader

class AddressboxScraper(BaseScraper):
    def __init__(self, downloader: Optional[AssetDownloader] = None, storage: Optional[Any] = None):
        super().__init__()
        self.downloader = downloader or AssetDownloader()
        self.storage = storage

    async def crawl_listings(self, start_url: str = "https://www.addressbox.com") -> List[str]:
        """Collect project and developer links from Addressbox including XML sitemaps."""
        urls = set()
        print(f"[Addressbox Crawler] Navigating to {start_url}...")
        try:
            html = await self.fetch_page_content(start_url)
            if self.storage:
                self.storage.save_raw_payload(start_url, "addressbox", html, content_type="html")
            soup = BeautifulSoup(html, "html.parser")

            # Extract links from homepage
            for a in soup.select("a[href]"):
                href = a.get("href", "")
                if href.startswith("/"):
                    href = f"https://www.addressbox.com{href}"
                if any(k in href.lower() for k in ["project-detail-page", "property-detail-page", "/project", "/property", "/developer", "/builder"]):
                    urls.add(href)
        except Exception as e:
            print(f"[Addressbox Error] Crawling homepage failed: {e}")

        # Crawl XML Sitemaps for comprehensive catalog coverage across projects, developers, and listings
        sitemap_urls = [
            "https://www.addressbox.com/sitemaps/projects/projects.xml",
            "https://www.addressbox.com/sitemaps/developer/developer.xml",
            "https://www.addressbox.com/sitemaps/projects/new-residential-projects.xml",
            "https://www.addressbox.com/sitemaps/residential/flats-sale.xml",
            "https://www.addressbox.com/sitemaps/residential/flats-rent.xml",
            "https://www.addressbox.com/sitemaps/residential/bungalow-villa-sale.xml"
        ]
        for sm_url in sitemap_urls:
            try:
                print(f"[Addressbox Sitemap] Fetching {sm_url}...")
                xml_content = await self.fetch_page_content(sm_url)
                if self.storage:
                    self.storage.save_raw_payload(sm_url, "addressbox", xml_content, content_type="html")
                extracted = re.findall(r'<loc>(https?://[^<]+)</loc>', xml_content)
                for link in extracted:
                    urls.add(link)
            except Exception as e:
                print(f"[Addressbox Sitemap Warning] Failed fetching {sm_url}: {e}")

        return list(urls)

    async def parse_developer(self, url: str) -> Optional[DeveloperSchema]:
        """Extract developer metadata from Addressbox."""
        try:
            html = await self.fetch_page_content(url)
            if self.storage:
                self.storage.save_raw_payload(url, "addressbox", html, content_type="html")
                for intercepted in self.intercepted_responses:
                    self.storage.save_raw_payload(intercepted["url"], "addressbox", json.dumps(intercepted["data"]), content_type="json")
            soup = BeautifulSoup(html, "html.parser")

            # 1. API-first / Next.js payload check
            next_data = soup.find("script", id="__NEXT_DATA__")
            dev_name = None
            phone = None
            email = None
            website = None
            logo_url = None

            if next_data:
                try:
                    payload = json.loads(next_data.string)
                    props = payload.get("props", {}).get("pageProps", {})
                    dev_data = props.get("developer") or props.get("builder") or {}
                    if dev_data:
                        dev_name = dev_data.get("name")
                        phone = dev_data.get("phone") or dev_data.get("mobile")
                        email = dev_data.get("email")
                        website = dev_data.get("website")
                        logo_url = dev_data.get("logo")
                except Exception:
                    pass

            # 2. DOM fallback
            if not dev_name:
                h1 = soup.find("h1")
                dev_name = h1.get_text(strip=True) if h1 else "Addressbox Developer"

            logo_asset = None
            if logo_url:
                logo_asset = await self.downloader.download_asset(logo_url, "logo")

            return DeveloperSchema(
                name=DataCleaner.clean_text(dev_name) or "Unknown Builder",
                city="Ahmedabad",
                phone=phone,
                email=email,
                website_url=website,
                source_platform="addressbox",
                source_url=url,
                logo_asset=logo_asset
            )
        except Exception as e:
            print(f"[Addressbox Parse Error] Developer parse failed for {url}: {e}")
            return None

    async def parse_project(self, url: str) -> Optional[ProjectSchema]:
        """Extract detailed project information, images, floorplans, and brochures."""
        try:
            html = await self.fetch_page_content(url)
            if self.storage:
                self.storage.save_raw_payload(url, "addressbox", html, content_type="html")
                for intercepted in self.intercepted_responses:
                    self.storage.save_raw_payload(intercepted["url"], "addressbox", json.dumps(intercepted["data"]), content_type="json")
            soup = BeautifulSoup(html, "html.parser")

            # Extract Title
            title_elem = soup.find("h1") or soup.find("title")
            title = title_elem.get_text(strip=True) if title_elem else "Addressbox Property"
            title = title.split("|")[0].strip()

            # Extract Price
            price_text = ""
            price_elem = soup.select_one(".price, [class*='price'], [class*='rate']")
            if price_elem:
                price_text = price_elem.get_text(strip=True)
            min_price, max_price = DataCleaner.extract_price_range(price_text)

            # Extract Location & BHK
            bhk_elem = soup.select_one("[class*='bhk'], [class*='config']")
            bhk = DataCleaner.normalize_bhk(bhk_elem.get_text(strip=True)) if bhk_elem else None

            locality_elem = soup.select_one(".location, [class*='locality'], [class*='address']")
            locality = DataCleaner.clean_text(locality_elem.get_text(strip=True)) if locality_elem else "Ahmedabad"

            # Extract Images
            cover_asset = None
            gallery_assets = []
            img_tags = soup.find_all("img")
            
            for idx, img in enumerate(img_tags):
                src = img.get("src") or img.get("data-src")
                if not src:
                    continue
                if src.startswith("/"):
                    src = f"https://www.addressbox.com{src}"
                if any(ext in src.lower() for ext in [".jpg", ".jpeg", ".png", ".webp"]):
                    if idx == 0 and not cover_asset:
                        cover_asset = await self.downloader.download_asset(src, "cover")
                    else:
                        asset = await self.downloader.download_asset(src, "gallery")
                        if asset:
                            gallery_assets.append(asset)

            # Extract RERA
            rera_match = re.search(r"RERA\s*(?:NO|ID|REG)?[:\s]*([A-Z0-9/]+)", html, re.IGNORECASE)
            rera_no = rera_match.group(1) if rera_match else None

            return ProjectSchema(
                title=title,
                price_min=min_price,
                price_max=max_price,
                bhk_config=bhk,
                locality=locality,
                city="Ahmedabad",
                rera_number=rera_no,
                source_platform="addressbox",
                source_url=url,
                cover_image=cover_asset,
                gallery_images=gallery_assets
            )
        except Exception as e:
            print(f"[Addressbox Parse Error] Project parse failed for {url}: {e}")
            return None
