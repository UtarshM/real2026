import os
import sys
from pathlib import Path

# Add local site-packages to python import path
site_packages_dir = Path(__file__).resolve().parent / "site-packages"
if site_packages_dir.exists() and str(site_packages_dir) not in sys.path:
    sys.path.insert(0, str(site_packages_dir))


# Base Paths
BASE_DIR = Path(__file__).resolve().parent
ASSETS_DIR = BASE_DIR / "assets"

LOGOS_DIR = ASSETS_DIR / "logos"
COVERS_DIR = ASSETS_DIR / "covers"
GALLERY_DIR = ASSETS_DIR / "gallery"
FLOORPLANS_DIR = ASSETS_DIR / "floorplans"
BROCHURES_DIR = ASSETS_DIR / "brochures"

# Ensure directories exist
for folder in [ASSETS_DIR, LOGOS_DIR, COVERS_DIR, GALLERY_DIR, FLOORPLANS_DIR, BROCHURES_DIR]:
    folder.mkdir(parents=True, exist_ok=True)

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR / 'Real2026.db'}")

# Scraper Settings
DEFAULT_USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, Gecko) Chrome/126.0.0.0 Safari/537.36"
)

REQUEST_TIMEOUT_SECONDS = 30
MAX_RETRIES = 3
BACKOFF_FACTOR = 2.0  # Exponential backoff base
DELAY_BETWEEN_REQUESTS_SEC = 1.5

# Target URLs
ADDRESSBOX_BASE_URL = "https://www.addressbox.com"
VITALSPACE_BASE_URL = "https://vitalspace.in"
