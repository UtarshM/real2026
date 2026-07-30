import json
from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Session
from database import (
    Developer, Project, ProjectImage, ProjectFloorplan,
    ProjectAmenity, Brochure, Video, RawPayload, ScrapeLog
)
from models import DeveloperSchema, ProjectSchema
from core.deduplicator import Deduplicator

class StoragePipeline:
    def __init__(self, db_session: Session):
        self.db = db_session

    def save_raw_payload(self, url: str, source_platform: str, raw_content: str, content_type: str = "html"):
        """Preserve exact raw JSON/HTML HTTP payload for re-parsing anytime."""
        content_hash = Deduplicator.calculate_text_hash(raw_content)
        
        raw_record = RawPayload(
            url=url,
            source_platform=source_platform,
            content_type=content_type,
            raw_content=raw_content,
            content_hash=content_hash
        )
        self.db.add(raw_record)
        self.db.commit()

    def save_developer(self, data: DeveloperSchema) -> str:
        """Store or update Developer record."""
        existing = None
        if data.rera_number:
            existing = self.db.query(Developer).filter(Developer.rera_number == data.rera_number).first()
        if not existing:
            existing = self.db.query(Developer).filter(
                Developer.name == data.name, Developer.source_platform == data.source_platform
            ).first()

        logo = data.logo_asset
        if existing:
            existing.phone = data.phone or existing.phone
            existing.email = data.email or existing.email
            existing.website_url = data.website_url or existing.website_url
            existing.description = data.description or existing.description
            if logo and logo.local_path:
                existing.logo_original_url = logo.original_url
                existing.logo_local_path = logo.local_path
                existing.logo_storage_url = logo.storage_url
                existing.logo_hash = logo.file_hash
            existing.last_scraped = datetime.utcnow()
            self.db.commit()
            return existing.id

        dev = Developer(
            name=data.name,
            slug=data.slug,
            rera_number=data.rera_number,
            city=data.city,
            state=data.state,
            address=data.address,
            phone=data.phone,
            email=data.email,
            website_url=data.website_url,
            description=data.description,
            total_projects=data.total_projects or 0,
            logo_original_url=logo.original_url if logo else None,
            logo_local_path=logo.local_path if logo else None,
            logo_storage_url=logo.storage_url if logo else None,
            logo_hash=logo.file_hash if logo else None,
            source_platform=data.source_platform,
            source_url=data.source_url,
            last_scraped=datetime.utcnow()
        )
        self.db.add(dev)
        self.db.commit()
        return dev.id

    def save_project(self, data: ProjectSchema, developer_id: Optional[str] = None) -> str:
        """Store or update Project with Change Detection."""
        # Calculate content hash for change detection
        project_dict_str = json.dumps({
            "title": data.title,
            "price_min": data.price_min,
            "price_max": data.price_max,
            "locality": data.locality,
            "bhk_config": data.bhk_config,
            "description": data.description
        }, sort_keys=True)
        content_hash = Deduplicator.calculate_text_hash(project_dict_str)

        existing = self.db.query(Project).filter(Project.source_url == data.source_url).first()
        cover = data.cover_image

        if existing:
            # Change detection check
            if existing.content_hash == content_hash:
                print(f"[Change Detection] Project '{data.title}' unchanged. Updating last_scraped.")
                existing.last_scraped = datetime.utcnow()
                self.db.commit()
                return existing.id

            # Update existing record
            existing.title = data.title
            existing.developer_id = developer_id or existing.developer_id
            existing.price_min = data.price_min
            existing.price_max = data.price_max
            existing.bhk_config = data.bhk_config
            existing.locality = data.locality
            existing.description = data.description
            existing.content_hash = content_hash
            existing.last_scraped = datetime.utcnow()
            existing.last_modified = datetime.utcnow()
            self.db.commit()
            return existing.id

        # Insert new project
        proj = Project(
            developer_id=developer_id,
            title=data.title,
            listing_type=data.listing_type,
            property_type=data.property_type,
            bhk_config=data.bhk_config,
            price_min=data.price_min,
            price_max=data.price_max,
            currency=data.currency,
            locality=data.locality,
            city=data.city,
            state=data.state,
            address=data.address,
            latitude=data.latitude,
            longitude=data.longitude,
            rera_number=data.rera_number,
            description=data.description,
            possession_date=data.possession_date,
            cover_image_original=cover.original_url if cover else None,
            cover_image_local=cover.local_path if cover else None,
            cover_image_storage=cover.storage_url if cover else None,
            cover_image_hash=cover.file_hash if cover else None,
            source_platform=data.source_platform,
            source_url=data.source_url,
            content_hash=content_hash,
            last_scraped=datetime.utcnow()
        )
        self.db.add(proj)
        self.db.commit()

        # Save gallery images
        for img in data.gallery_images:
            if img:
                img_record = ProjectImage(
                    project_id=proj.id,
                    category=img.category,
                    original_url=img.original_url,
                    local_path=img.local_path,
                    storage_url=img.storage_url,
                    file_hash=img.file_hash,
                    width=img.width,
                    height=img.height,
                    size_bytes=img.size_bytes
                )
                self.db.add(img_record)

        # Save floorplans
        for fp in data.floorplans:
            asset = fp.image_asset
            fp_record = ProjectFloorplan(
                project_id=proj.id,
                title=fp.title,
                unit_type=fp.unit_type,
                super_builtup_area_sqft=fp.super_builtup_area_sqft,
                carpet_area_sqft=fp.carpet_area_sqft,
                price=fp.price,
                original_url=asset.original_url if asset else None,
                local_path=asset.local_path if asset else None,
                file_hash=asset.file_hash if asset else None
            )
            self.db.add(fp_record)

        # Save amenities
        for amenity in data.amenities:
            self.db.add(ProjectAmenity(project_id=proj.id, name=amenity))

        # Save brochures
        for brochure in data.brochures:
            self.db.add(Brochure(
                project_id=proj.id,
                title=brochure.title,
                original_url=brochure.original_url,
                local_path=brochure.local_path,
                file_hash=brochure.file_hash
            ))

        # Save videos
        for vid in data.videos:
            self.db.add(Video(
                project_id=proj.id,
                title=vid.title,
                video_url=vid.video_url,
                is_360_tour=vid.is_360_tour
            ))

        self.db.commit()
        return proj.id

    def log_scrape_session(
        self,
        source_platform: str,
        total_crawled: int,
        total_saved: int,
        total_assets_downloaded: int,
        status: str = "success",
        error_log: Optional[str] = None,
        started_at: Optional[datetime] = None,
        completed_at: Optional[datetime] = None
    ) -> str:
        """Record execution metrics into scrape_logs table."""
        log = ScrapeLog(
            source_platform=source_platform,
            total_crawled=total_crawled,
            total_saved=total_saved,
            total_assets_downloaded=total_assets_downloaded,
            status=status,
            error_log=error_log,
            started_at=started_at or datetime.utcnow(),
            completed_at=completed_at or datetime.utcnow()
        )
        self.db.add(log)
        self.db.commit()
        return log.id

