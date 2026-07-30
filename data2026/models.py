from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class MediaAssetSchema(BaseModel):
    category: str  # 'logo', 'cover', 'gallery', 'floorplan', 'masterplan', 'location_map'
    original_url: str
    local_path: Optional[str] = None
    storage_url: Optional[str] = None
    file_hash: Optional[str] = None
    width: Optional[int] = None
    height: Optional[int] = None
    size_bytes: Optional[int] = None

class FloorplanSchema(BaseModel):
    title: str
    unit_type: Optional[str] = None  # e.g., '3 BHK Type A'
    super_builtup_area_sqft: Optional[float] = None
    carpet_area_sqft: Optional[float] = None
    price: Optional[float] = None
    image_asset: Optional[MediaAssetSchema] = None

class BrochureSchema(BaseModel):
    title: str
    original_url: str
    local_path: Optional[str] = None
    file_hash: Optional[str] = None

class VideoSchema(BaseModel):
    title: Optional[str] = None
    video_url: str
    is_360_tour: bool = False

class DeveloperSchema(BaseModel):
    name: str
    slug: Optional[str] = None
    rera_number: Optional[str] = None
    city: str = "Ahmedabad"
    state: str = "Gujarat"
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    website_url: Optional[str] = None
    description: Optional[str] = None
    total_projects: Optional[int] = 0
    source_platform: str
    source_url: str
    logo_asset: Optional[MediaAssetSchema] = None

class ProjectSchema(BaseModel):
    title: str
    developer_name: Optional[str] = None
    developer_rera_number: Optional[str] = None
    listing_type: str = "Buy"  # Buy, Rent, New Project
    property_type: Optional[str] = "Apartment"
    bhk_config: Optional[str] = None
    price_min: Optional[float] = None
    price_max: Optional[float] = None
    currency: str = "INR"
    locality: Optional[str] = None
    city: str = "Ahmedabad"
    state: str = "Gujarat"
    address: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    rera_number: Optional[str] = None
    description: Optional[str] = None
    possession_date: Optional[str] = None
    source_platform: str
    source_url: str
    content_hash: Optional[str] = None
    
    # Asset lists
    cover_image: Optional[MediaAssetSchema] = None
    gallery_images: List[MediaAssetSchema] = []
    floorplans: List[FloorplanSchema] = []
    amenities: List[str] = []
    brochures: List[BrochureSchema] = []
    videos: List[VideoSchema] = []
