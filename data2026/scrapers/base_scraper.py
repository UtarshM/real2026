import asyncio
import httpx
from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
from config import DEFAULT_USER_AGENT, REQUEST_TIMEOUT_SECONDS

try:
    from playwright.async_api import async_playwright, Browser, Page
    HAS_PLAYWRIGHT = True
except ImportError:
    HAS_PLAYWRIGHT = False
    Browser = Any
    Page = Any

class BaseScraper(ABC):
    def __init__(self, headless: bool = True):
        self.headless = headless
        self.user_agent = DEFAULT_USER_AGENT
        self.browser: Optional[Any] = None
        self.page: Optional[Any] = None
        self.http_client: Optional[httpx.AsyncClient] = None
        self.intercepted_responses: List[Dict[str, Any]] = []

    async def initialize(self, p=None):
        """Initialize Playwright browser context if p provided, otherwise setup HTTPX client."""
        headers = {"User-Agent": self.user_agent}
        self.http_client = httpx.AsyncClient(timeout=REQUEST_TIMEOUT_SECONDS, follow_redirects=True, headers=headers)
        
        if p and HAS_PLAYWRIGHT:
            try:
                self.browser = await p.chromium.launch(headless=self.headless)
                context = await self.browser.new_context(
                    user_agent=self.user_agent,
                    viewport={"width": 1280, "height": 800}
                )
                self.page = await context.new_page()

                # Handle API interception
                async def handle_response(response):
                    try:
                        url = response.url
                        if ("api" in url or "_next/data" in url) and response.status == 200:
                            ct = response.headers.get("content-type", "")
                            if "json" in ct:
                                json_data = await response.json()
                                self.intercepted_responses.append({"url": url, "data": json_data})
                    except Exception:
                        pass

                self.page.on("response", handle_response)
            except Exception as e:
                print(f"[Scraper Warning] Playwright initialization skipped: {e}")

    async def fetch_page_content(self, url: str) -> str:
        """Fetch HTML content using Playwright if page active, or HTTPX as high-speed primary."""
        if self.page:
            try:
                await self.page.goto(url, wait_until="domcontentloaded", timeout=30000)
                return await self.page.content()
            except Exception as e:
                print(f"[Playwright Warning] Page goto failed for {url}, falling back to HTTPX: {e}")

        if not self.http_client:
            headers = {"User-Agent": self.user_agent}
            self.http_client = httpx.AsyncClient(timeout=REQUEST_TIMEOUT_SECONDS, follow_redirects=True, headers=headers)

        resp = await self.http_client.get(url)
        return resp.text

    async def close(self):
        if self.browser:
            await self.browser.close()
        if self.http_client:
            await self.http_client.aclose()

    @abstractmethod
    async def crawl_listings(self, start_url: str) -> List[str]:
        """Crawl starting page and return listing target URLs."""
        pass

    @abstractmethod
    async def parse_developer(self, url: str) -> Optional[Any]:
        """Extract developer data from target page."""
        pass

    @abstractmethod
    async def parse_project(self, url: str) -> Optional[Any]:
        """Extract project data from target page."""
        pass
