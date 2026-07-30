import uuid
from datetime import datetime
from sqlalchemy import (
    create_engine, Column, String, Integer, Float, Text, DateTime,
    ForeignKey, Boolean, Numeric, JSON
)
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from config import DATABASE_URL

Base = declarative_base()

def generate_uuid():
    return str(uuid.uuid4())

class CrawlQueue(Base):
    __tablename__ = "crawl_queue"

    id = Column(String, primary_key=True, default=generate_uuid)
    url = Column(String, unique=True, nullable=False)
    source_platform = Column(String, nullable=False)  # 'addressbox' or 'vitalspace'
    entity_type = Column(String, nullable=False)      # 'developer_list', 'developer_detail', 'project_detail'
    status = Column(String, default="pending")        # 'pending', 'processing', 'completed', 'failed'
    retry_count = Column(Integer, default=0)
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class RawPayload(Base):
    __tablename__ = "raw_payloads"

    id = Column(String, primary_key=True, default=generate_uuid)
    url = Column(String, nullable=False)
    source_platform = Column(String, nullable=False)
    content_type = Column(String, default="html")  # 'html' or 'json'
    raw_content = Column(Text, nullable=False)
    content_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Developer(Base):
    __tablename__ = "developers"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    slug = Column(String, nullable=True)
    rera_number = Column(String, nullable=True, index=True)
    city = Column(String, default="Ahmedabad")
    state = Column(String, default="Gujarat")
    address = Column(Text, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    website_url = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    total_projects = Column(Integer, default=0)
    logo_original_url = Column(Text, nullable=True)
    logo_local_path = Column(Text, nullable=True)
    logo_storage_url = Column(Text, nullable=True)
    logo_hash = Column(String, nullable=True)
    source_platform = Column(String, nullable=False)
    source_url = Column(Text, nullable=False)
    last_scraped = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

    projects = relationship("Project", back_populates="developer", cascade="all, delete-orphan")

class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=generate_uuid)
    developer_id = Column(String, ForeignKey("developers.id"), nullable=True)
    title = Column(String, nullable=False)
    listing_type = Column(String, default="Buy")
    property_type = Column(String, default="Apartment")
    bhk_config = Column(String, nullable=True)
    price_min = Column(Numeric(12, 2), nullable=True)
    price_max = Column(Numeric(12, 2), nullable=True)
    currency = Column(String, default="INR")
    locality = Column(String, nullable=True)
    city = Column(String, default="Ahmedabad")
    state = Column(String, default="Gujarat")
    address = Column(Text, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    rera_number = Column(String, nullable=True, index=True)
    description = Column(Text, nullable=True)
    possession_date = Column(String, nullable=True)
    cover_image_original = Column(Text, nullable=True)
    cover_image_local = Column(Text, nullable=True)
    cover_image_storage = Column(Text, nullable=True)
    cover_image_hash = Column(String, nullable=True)
    source_platform = Column(String, nullable=False)
    source_url = Column(Text, unique=True, nullable=False)
    content_hash = Column(String, nullable=True)
    last_scraped = Column(DateTime, default=datetime.utcnow)
    last_modified = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

    developer = relationship("Developer", back_populates="projects")
    images = relationship("ProjectImage", back_populates="project", cascade="all, delete-orphan")
    floorplans = relationship("ProjectFloorplan", back_populates="project", cascade="all, delete-orphan")
    amenities = relationship("ProjectAmenity", back_populates="project", cascade="all, delete-orphan")
    brochures = relationship("Brochure", back_populates="project", cascade="all, delete-orphan")
    videos = relationship("Video", back_populates="project", cascade="all, delete-orphan")

class ProjectImage(Base):
    __tablename__ = "project_images"

    id = Column(String, primary_key=True, default=generate_uuid)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    category = Column(String, default="gallery")  # 'gallery', 'cover', 'masterplan', 'location_map'
    original_url = Column(Text, nullable=False)
    local_path = Column(Text, nullable=True)
    storage_url = Column(Text, nullable=True)
    file_hash = Column(String, nullable=True, index=True)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    size_bytes = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="images")

class ProjectFloorplan(Base):
    __tablename__ = "project_floorplans"

    id = Column(String, primary_key=True, default=generate_uuid)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    title = Column(String, nullable=False)
    unit_type = Column(String, nullable=True)
    super_builtup_area_sqft = Column(Float, nullable=True)
    carpet_area_sqft = Column(Float, nullable=True)
    price = Column(Numeric(12, 2), nullable=True)
    original_url = Column(Text, nullable=True)
    local_path = Column(Text, nullable=True)
    file_hash = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="floorplans")

class ProjectAmenity(Base):
    __tablename__ = "project_amenities"

    id = Column(String, primary_key=True, default=generate_uuid)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    name = Column(String, nullable=False)

    project = relationship("Project", back_populates="amenities")

class Brochure(Base):
    __tablename__ = "brochures"

    id = Column(String, primary_key=True, default=generate_uuid)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    title = Column(String, nullable=False)
    original_url = Column(Text, nullable=False)
    local_path = Column(Text, nullable=True)
    file_hash = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="brochures")

class Video(Base):
    __tablename__ = "videos"

    id = Column(String, primary_key=True, default=generate_uuid)
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    title = Column(String, nullable=True)
    video_url = Column(Text, nullable=False)
    is_360_tour = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="videos")

class ScrapeLog(Base):
    __tablename__ = "scrape_logs"

    id = Column(String, primary_key=True, default=generate_uuid)
    source_platform = Column(String, nullable=False)
    total_crawled = Column(Integer, default=0)
    total_saved = Column(Integer, default=0)
    total_assets_downloaded = Column(Integer, default=0)
    status = Column(String, default="success")  # 'success', 'failed', 'partial'
    error_log = Column(Text, nullable=True)
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, default=datetime.utcnow)

# Engine Initialization
engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
