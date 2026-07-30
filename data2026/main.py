import config
import argparse
import asyncio
import json
import csv

try:
    import pandas as pd
    HAS_PANDAS = True
except ImportError:
    HAS_PANDAS = False

from sqlalchemy.orm import Session
from database import SessionLocal, init_db, Developer, Project, ProjectImage, CrawlQueue, RawPayload
from core.queue import QueueManager
from scrapers.addressbox_scraper import AddressboxScraper
from scrapers.vitalspace_scraper import VitalspaceScraper
from pipelines.storage_pipeline import StoragePipeline
from pipelines.asset_downloader import AssetDownloader
try:
    from playwright.async_api import async_playwright
    HAS_PLAYWRIGHT = True
except ImportError:
    HAS_PLAYWRIGHT = False

async def run_crawl(source: str):
    """Crawl target site for listing URLs and push to queue."""
    db = SessionLocal()
    queue = QueueManager(db)
    storage = StoragePipeline(db)

    p_instance = None
    playwright_obj = None
    if HAS_PLAYWRIGHT:
        try:
            playwright_obj = await async_playwright().start()
        except Exception:
            playwright_obj = None

    try:
        if source in ["all", "addressbox"]:
            ab_scraper = AddressboxScraper(storage=storage)
            await ab_scraper.initialize(playwright_obj)
            ab_urls = await ab_scraper.crawl_listings()
            for url in ab_urls:
                queue.push_url(url, "addressbox", "project_detail")
            await ab_scraper.close()
            print(f"[Crawl Completed] Addressbox URLs pushed: {len(ab_urls)}")

        if source in ["all", "vitalspace"]:
            vs_scraper = VitalspaceScraper(storage=storage)
            await vs_scraper.initialize(playwright_obj)
            vs_urls = await vs_scraper.crawl_listings()
            for url in vs_urls:
                queue.push_url(url, "vitalspace", "project_detail")
            await vs_scraper.close()
            print(f"[Crawl Completed] Vitalspace URLs pushed: {len(vs_urls)}")
    finally:
        if playwright_obj:
            await playwright_obj.stop()
        db.close()

async def run_scrape(limit: int = 20):
    """Scrape queued URLs, process data, download media assets, and save to DB."""
    db = SessionLocal()
    queue = QueueManager(db)
    storage = StoragePipeline(db)
    downloader = AssetDownloader()

    pending_items = queue.pop_pending(limit=limit)
    if not pending_items:
        print("[Scrape Task] No pending URLs found in queue. Run --crawl first.")
        db.close()
        return

    print(f"[Scrape Task] Processing {len(pending_items)} queued URLs...")

    saved_count = 0
    assets_count = 0
    errors = []

    playwright_obj = None
    if HAS_PLAYWRIGHT:
        try:
            playwright_obj = await async_playwright().start()
        except Exception:
            playwright_obj = None

    try:
        ab_scraper = AddressboxScraper(downloader=downloader, storage=storage)
        await ab_scraper.initialize(playwright_obj)
        
        vs_scraper = VitalspaceScraper(downloader=downloader, storage=storage)
        await vs_scraper.initialize(playwright_obj)

        for item in pending_items:
            print(f"-> Scraping ({item.source_platform}): {item.url}")
            try:
                if item.source_platform == "addressbox":
                    dev_data = await ab_scraper.parse_developer(item.url)
                    dev_id = storage.save_developer(dev_data) if dev_data else None

                    proj_data = await ab_scraper.parse_project(item.url)
                    if proj_data:
                        storage.save_project(proj_data, developer_id=dev_id)
                        saved_count += 1
                        assets_count += len(proj_data.gallery_images) + (1 if proj_data.cover_image else 0)

                elif item.source_platform == "vitalspace":
                    dev_data = await vs_scraper.parse_developer(item.url)
                    dev_id = storage.save_developer(dev_data) if dev_data else None

                    proj_data = await vs_scraper.parse_project(item.url)
                    if proj_data:
                        storage.save_project(proj_data, developer_id=dev_id)
                        saved_count += 1
                        assets_count += len(proj_data.gallery_images) + (1 if proj_data.cover_image else 0)

                queue.mark_completed(item.id)
            except Exception as e:
                print(f"[Scrape Error] Failed for {item.url}: {e}")
                errors.append(f"{item.url}: {str(e)}")
                queue.mark_failed(item.id, str(e))

        await ab_scraper.close()
        await vs_scraper.close()
    finally:
        if playwright_obj:
            await playwright_obj.stop()

    # Log scrape session
    status_str = "success" if not errors else ("partial" if saved_count > 0 else "failed")
    storage.log_scrape_session(
        source_platform="all",
        total_crawled=len(pending_items),
        total_saved=saved_count,
        total_assets_downloaded=assets_count,
        status=status_str,
        error_log="\n".join(errors) if errors else None
    )

    db.close()

def export_data(format_type: str = "json"):
    """Export database records to JSON or CSV."""
    db = SessionLocal()
    developers = db.query(Developer).all()
    projects = db.query(Project).all()

    dev_list = []
    for d in developers:
        dev_list.append({
            "id": d.id,
            "name": d.name,
            "rera_number": d.rera_number,
            "city": d.city,
            "phone": d.phone,
            "email": d.email,
            "website_url": d.website_url,
            "logo_local_path": d.logo_local_path,
            "source_platform": d.source_platform
        })

    proj_list = []
    for p in projects:
        proj_list.append({
            "id": p.id,
            "title": p.title,
            "developer_id": p.developer_id,
            "price_min": float(p.price_min) if p.price_min else None,
            "price_max": float(p.price_max) if p.price_max else None,
            "bhk_config": p.bhk_config,
            "locality": p.locality,
            "city": p.city,
            "rera_number": p.rera_number,
            "cover_image_local": p.cover_image_local,
            "source_platform": p.source_platform,
            "source_url": p.source_url
        })

    if format_type == "json":
        data = {"developers": dev_list, "projects": proj_list}
        with open("marketplace_export.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("[Export] Successfully exported data to marketplace_export.json")
    elif format_type == "csv":
        if HAS_PANDAS:
            df_dev = pd.DataFrame(dev_list)
            df_proj = pd.DataFrame(proj_list)
            df_dev.to_csv("marketplace_developers.csv", index=False)
            df_proj.to_csv("marketplace_projects.csv", index=False)
        else:
            if dev_list:
                with open("marketplace_developers.csv", "w", newline="", encoding="utf-8") as f:
                    writer = csv.DictWriter(f, fieldnames=dev_list[0].keys())
                    writer.writeheader()
                    writer.writerows(dev_list)
            if proj_list:
                with open("marketplace_projects.csv", "w", newline="", encoding="utf-8") as f:
                    writer = csv.DictWriter(f, fieldnames=proj_list[0].keys())
                    writer.writeheader()
                    writer.writerows(proj_list)
        print("[Export] Successfully exported data to marketplace_developers.csv and marketplace_projects.csv")

    db.close()

def show_stats():
    """Display database statistics."""
    db = SessionLocal()
    dev_count = db.query(Developer).count()
    proj_count = db.query(Project).count()
    img_count = db.query(ProjectImage).count()
    raw_count = db.query(RawPayload).count()
    pending_queue = db.query(CrawlQueue).filter(CrawlQueue.status == "pending").count()
    completed_queue = db.query(CrawlQueue).filter(CrawlQueue.status == "completed").count()

    print("\n========== Real2026 Database Statistics ==========")
    print(f" Total Developers Extracted: {dev_count}")
    print(f" Total Projects Extracted:   {proj_count}")
    print(f" Total Media Assets Saved:   {img_count}")
    print(f" Raw Payloads Cached:        {raw_count}")
    print(f" Crawl Queue Pending:        {pending_queue}")
    print(f" Crawl Queue Completed:      {completed_queue}")
    print("====================================================\n")
    db.close()

def main():
    parser = argparse.ArgumentParser(description="Real2026 Enterprise Scraper & Media Harvester CLI")
    parser.add_argument("--init-db", action="store_true", help="Initialize database schema tables")
    parser.add_argument("--crawl", type=str, choices=["all", "addressbox", "vitalspace"], help="Crawl target platform for URLs")
    parser.add_argument("--scrape", action="store_true", help="Run scrapers on queued URLs")
    parser.add_argument("--limit", type=int, default=10, help="Limit number of items to scrape")
    parser.add_argument("--export", type=str, choices=["json", "csv"], help="Export data to JSON or CSV")
    parser.add_argument("--stats", action="store_true", help="Show database statistics")

    args = parser.parse_args()

    if args.init_db:
        init_db()
        print("[Database] Schema tables initialized successfully.")

    if args.crawl:
        asyncio.run(run_crawl(args.crawl))

    if args.scrape:
        asyncio.run(run_scrape(limit=args.limit))

    if args.export:
        export_data(format_type=args.export)

    if args.stats:
        show_stats()

if __name__ == "__main__":
    main()
