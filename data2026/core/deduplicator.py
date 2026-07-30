import hashlib
from typing import Optional, Tuple
from pathlib import Path
from PIL import Image

class Deduplicator:
    @staticmethod
    def calculate_bytes_hash(data_bytes: bytes) -> str:
        """Calculate SHA-256 hash of byte content."""
        return hashlib.sha256(data_bytes).hexdigest()

    @staticmethod
    def calculate_file_hash(file_path: Path) -> str:
        """Calculate SHA-256 hash of a local file."""
        hasher = hashlib.sha256()
        with open(file_path, "rb") as f:
            while chunk := f.read(8192):
                hasher.update(chunk)
        return hasher.hexdigest()

    @staticmethod
    def calculate_text_hash(text: str) -> str:
        """Calculate MD5 hash of text/JSON payload for content change detection."""
        return hashlib.md5(text.encode("utf-8")).hexdigest()

    @staticmethod
    def get_image_dimensions(file_path: Path) -> Tuple[Optional[int], Optional[int]]:
        """Extract width and height of an image file."""
        try:
            with Image.open(file_path) as img:
                return img.width, img.height
        except Exception:
            return None, None
