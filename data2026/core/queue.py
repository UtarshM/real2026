from typing import Optional, List
from sqlalchemy.orm import Session
from database import CrawlQueue

class QueueManager:
    def __init__(self, db_session: Session):
        self.db = db_session

    def push_url(self, url: str, source_platform: str, entity_type: str) -> bool:
        """Add a URL to the crawl queue if it doesn't already exist."""
        existing = self.db.query(CrawlQueue).filter(CrawlQueue.url == url).first()
        if existing:
            return False
        
        item = CrawlQueue(
            url=url,
            source_platform=source_platform,
            entity_type=entity_type,
            status="pending"
        )
        self.db.add(item)
        self.db.commit()
        return True

    def pop_pending(self, source_platform: Optional[str] = None, limit: int = 10) -> List[CrawlQueue]:
        """Fetch pending items from queue."""
        query = self.db.query(CrawlQueue).filter(CrawlQueue.status == "pending")
        if source_platform:
            query = query.filter(CrawlQueue.source_platform == source_platform)
        return query.limit(limit).all()

    def mark_completed(self, item_id: str):
        item = self.db.query(CrawlQueue).filter(CrawlQueue.id == item_id).first()
        if item:
            item.status = "completed"
            self.db.commit()

    def mark_failed(self, item_id: str, error_msg: str, max_retries: int = 3):
        item = self.db.query(CrawlQueue).filter(CrawlQueue.id == item_id).first()
        if item:
            item.retry_count += 1
            item.error_message = error_msg
            if item.retry_count >= max_retries:
                item.status = "failed"
            else:
                item.status = "pending"  # Re-tryable
            self.db.commit()
