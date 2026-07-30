import httpx
import asyncio
from pathlib import Path
from typing import Optional, Dict
from config import LOGOS_DIR, COVERS_DIR, GALLERY_DIR, FLOORPLANS_DIR, BROCHURES_DIR, DEFAULT_USER_AGENT
from core.deduplicator import Deduplicator
from models import MediaAssetSchema, BrochureSchema

class AssetDownloader:
    def __init__(self):
        self.headers = {"User-Agent": DEFAULT_USER_AGENT}

    def _get_target_dir(self, category: str) -> Path:
        category_map = {
            "logo": LOGOS_DIR,
            "cover": COVERS_DIR,
            "gallery": GALLERY_DIR,
            "floorplan": FLOORPLANS_DIR,
            "brochure": BROCHURES_DIR,
        }
        return category_map.get(category, GALLERY_DIR)

    async def download_asset(self, url: str, category: str) -> Optional[MediaAssetSchema]:
        """Download an image or document asset, compute SHA256, deduplicate, and record metadata."""
        if not url or not url.startswith("http"):
            return None

        try:
            async with httpx.AsyncClient(timeout=20.0, follow_redirects=True, headers=self.headers) as client:
                resp = await client.get(url)
                if resp.status_code != 200:
                    print(f"[Asset Warning] Failed to download {url} - Status Code: {resp.status_code}")
                    return MediaAssetSchema(category=category, original_url=url)

                data = resp.content
                file_hash = Deduplicator.calculate_bytes_hash(data)
                
                # Deduplication check: check if file with this hash already exists
                target_dir = self._get_target_dir(category)
                ext = url.split("?")[0].split(".")[-1].lower()
                if len(ext) > 4 or "/" in ext or not ext:
                    ext = "png" if category != "brochure" else "pdf"

                filename = f"{file_hash[:16]}.{ext}"
                file_path = target_dir / filename

                # If file doesn't exist locally, write bytes
                if not file_path.exists():
                    with open(file_path, "wb") as f:
                        f.write(data)

                # Extract dimensions if image
                width, height = Deduplicator.get_image_dimensions(file_path) if category != "brochure" else (None, None)

                return MediaAssetSchema(
                    category=category,
                    original_url=url,
                    local_path=str(file_path),
                    storage_url=str(file_path),  # Can be updated to Cloudflare R2 / AWS S3 URL
                    file_hash=file_hash,
                    width=width,
                    height=height,
                    size_bytes=len(data)
                )

        except Exception as e:
            print(f"[Asset Error] Error downloading {url}: {e}")
            return MediaAssetSchema(category=category, original_url=url)
