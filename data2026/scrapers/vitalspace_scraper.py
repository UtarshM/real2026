import json
import re
from typing import List, Optional, Any
from bs4 import BeautifulSoup
from scrapers.base_scraper import BaseScraper
from models import DeveloperSchema, ProjectSchema, MediaAssetSchema, FloorplanSchema, BrochureSchema, VideoSchema
from pipelines.cleaner import DataCleaner
from pipelines.asset_downloader import AssetDownloader

class VitalspaceScraper(BaseScraper):
    def __init__(self, downloader: Optional[AssetDownloader] = None, storage: Optional[Any] = None):
        super().__init__()
        self.downloader = downloader or AssetDownloader()
        self.storage = storage

    async def crawl_listings(self, start_url: str = "https://vitalspace.in") -> List[str]:
        """Collect project links from Vitalspace."""
        urls = set()
        pages_to_scan = [start_url, "https://vitalspace.in/properties"]

        for target_page in pages_to_scan:
            print(f"[Vitalspace Crawler] Navigating to {target_page}...")
            try:
                html = await self.fetch_page_content(target_page)
                if self.storage:
                    self.storage.save_raw_payload(target_page, "vitalspace", html, content_type="html")
                soup = BeautifulSoup(html, "html.parser")

                # Collect project links
                for a in soup.select("a[href]"):
                    href = a.get("href", "")
                    if href.startswith("//"):
                        href = f"https:{href}"
                    elif href.startswith("/"):
                        href = f"https://vitalspace.in{href}"

                    if any(k in href.lower() for k in ["bhk", "property", "project", "detail", "ahmedabad", "flats"]):
                        if not any(excluded in href for excluded in ["about-us", "career", "contact", "terms", "sitemap", "faq", "blog"]):
                            urls.add(href)
            except Exception as e:
                print(f"[Vitalspace Error] Crawling failed for {target_page}: {e}")
        
        return list(urls)

    async def parse_developer(self, url: str) -> Optional[DeveloperSchema]:
        """Extract builder/developer information from Vitalspace."""
        try:
            html = await self.fetch_page_content(url)
            if self.storage:
                self.storage.save_raw_payload(url, "vitalspace", html, content_type="html")
                for intercepted in self.intercepted_responses:
                    self.storage.save_raw_payload(intercepted["url"], "vitalspace", json.dumps(intercepted["data"]), content_type="json")
            soup = BeautifulSoup(html, "html.parser")

            # RERA match
            rera_match = re.search(r"Rera No:\s*([A-Z0-9/]+)", html, re.IGNORECASE)
            rera_no = rera_match.group(1) if rera_match else "AG/GJ/AHMEDABAD/AA00842"

            dev_name = "Vital Space Developers"
            logo_asset = None
            logo_img = soup.select_one("img[alt*='Logo'], img[alt*='logo']")
            if logo_img:
                src = logo_img.get("src")
                if src:
                    if src.startswith("/"):
                        src = f"https://vitalspace.in{src}"
                    logo_asset = await self.downloader.download_asset(src, "logo")

            return DeveloperSchema(
                name=dev_name,
                city="Ahmedabad",
                state="Gujarat",
                phone="+91 99984 70000",
                email="info@vitalspace.in",
                website_url="https://vitalspace.in",
                rera_number=rera_no,
                source_platform="vitalspace",
                source_url=url,
                logo_asset=logo_asset
            )
        except Exception as e:
            print(f"[Vitalspace Parse Error] Developer parse failed for {url}: {e}")
            return None

    async def parse_project(self, url: str) -> Optional[ProjectSchema]:
        """Extract full project listing details from Vitalspace."""
        try:
            html = await self.fetch_page_content(url)
            if self.storage:
                self.storage.save_raw_payload(url, "vitalspace", html, content_type="html")
                for intercepted in self.intercepted_responses:
                    self.storage.save_raw_payload(intercepted["url"], "vitalspace", json.dumps(intercepted["data"]), content_type="json")
            soup = BeautifulSoup(html, "html.parser")

            title_elem = soup.find("h1") or soup.find("title")
            title = title_elem.get_text(strip=True) if title_elem else "Vital Space Listing"
            title = title.split("|")[0].strip()

            # Price Range
            price_text = ""
            price_elem = soup.select_one(".text-primary, [class*='price']")
            if price_elem:
                price_text = price_elem.get_text(strip=True)
            min_price, max_price = DataCleaner.extract_price_range(price_text)

            # Location & BHK
            bhk_elem = soup.select_one("[class*='bhk'], [class*='config']")
            bhk = DataCleaner.normalize_bhk(bhk_elem.get_text(strip=True)) if bhk_elem else None

            # RERA
            rera_match = re.search(r"Rera No:\s*([A-Z0-9/]+)", html, re.IGNORECASE)
            rera_no = rera_match.group(1) if rera_match else None

            # Download Images
            cover_asset = None
            gallery_assets = []
            img_tags = soup.find_all("img")

            for idx, img in enumerate(img_tags):
                src = img.get("src") or img.get("data-src")
                if not src or "logo" in src.lower() or "favicon" in src.lower():
                    continue
                if src.startswith("/"):
                    src = f"https://vitalspace.in{src}"
                if any(ext in src.lower() for ext in [".jpg", ".jpeg", ".png", ".webp"]):
                    if idx == 0 and not cover_asset:
                        cover_asset = await self.downloader.download_asset(src, "cover")
                    else:
                        asset = await self.downloader.download_asset(src, "gallery")
                        if asset:
                            gallery_assets.append(asset)

            return ProjectSchema(
                title=title,
                price_min=min_price,
                price_max=max_price,
                bhk_config=bhk,
                locality="Ahmedabad / Gandhinagar",
                city="Ahmedabad",
                rera_number=rera_no,
                source_platform="vitalspace",
                source_url=url,
                cover_image=cover_asset,
                gallery_images=gallery_assets
            )
        except Exception as e:
            print(f"[Vitalspace Parse Error] Project parse failed for {url}: {e}")
            return None
