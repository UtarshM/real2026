# Real2026 Enterprise Scraper & Media Harvester

A production-ready asynchronous web scraper and asset harvester built for **Addressbox.com** and **Vitalspace.in** tailored for the **Scalezix Venture Marketplace**.

## Features & Capabilities

1. **API-First Browser-Second Strategy**: Extracts Next.js `__NEXT_DATA__` scripts and JSON API endpoints first, falling back to Playwright headless DOM parsing.
2. **Complete Asset Harvesting**: Downloads and stores developer logos, cover images, gallery photos, floor plans, and brochures.
3. **SHA-256 Deduplication**: Computes SHA-256 hashes of all media bytes before saving to prevent duplicate downloads and save storage.
4. **Original & Local Asset Paths**: Stores `original_url`, `local_path`, `storage_url`, and `file_hash` for every asset.
5. **Incremental Change Detection**: Generates MD5/SHA-256 content hashes of listing records; skips unchanged records during re-scrapes.
6. **Raw Payload Preservation**: Stores exact HTML & JSON API responses in a `raw_payloads` table for offline re-parsing.
7. **Resilient Decoupled Queue**: `crawl_queue` manager with exponential retry backoff on HTTP `429` / `5xx` errors.
8. **Multi-Format Export**: Exports normalized records to `marketplace_export.json` or `marketplace_projects.csv`.

---

## Directory Structure

```
data2026/
├── config.py                 # Paths, rates, retry limits
├── database.py               # SQLAlchemy 10-table ORM schema
├── models.py                 # Pydantic schemas
├── assets/                   # Downloaded media assets
│   ├── logos/
│   ├── covers/
│   ├── gallery/
│   ├── floorplans/
│   └── brochures/
├── core/
│   ├── queue.py              # CrawlQueue manager
│   ├── retry.py              # Exponential backoff retry handler
│   └── deduplicator.py       # SHA-256 hash & deduplication module
├── scrapers/
│   ├── base_scraper.py       # Abstract Base Scraper
│   ├── addressbox_scraper.py # Addressbox crawler & parser
│   └── vitalspace_scraper.py # Vitalspace crawler & parser
├── pipelines/
│   ├── asset_downloader.py   # Async media downloader & metadata extractor
│   ├── cleaner.py            # Price, text & BHK normalizer
│   └── storage_pipeline.py   # DB persistence & change detector
├── main.py                   # CLI orchestrator
└── requirements.txt          # Dependencies
```

---

## Quickstart Guide

### 1. Installation

```bash
cd /Users/utkarshmakwana/Desktop/Scalezix_venture/Real2026/data2026
pip install -r requirements.txt
playwright install chromium
```

### 2. Initialize Database

Initialize the 10 relational tables in SQLite (`Real2026.db`):

```bash
python main.py --init-db
```

### 3. Crawl Target Platforms

Discover URLs from target platforms and populate `crawl_queue`:

```bash
# Crawl all platforms
python main.py --crawl all

# Or crawl specific platform
python main.py --crawl addressbox
python main.py --crawl vitalspace
```

### 4. Execute Scraper & Download Media Assets

Scrape queued URLs, process listing data, and download media assets:

```bash
python main.py --scrape --limit 20
```

### 5. Check Database Statistics

View counts for Developers, Projects, Media Assets, and Crawl Queue status:

```bash
python main.py --stats
```

### 6. Export Data to Marketplace

Export clean records for ingestion into your marketplace platform:

```bash
# Export JSON
python main.py --export json

# Export CSV
python main.py --export csv
```
