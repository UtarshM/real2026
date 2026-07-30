import time
import asyncio
from typing import Callable, Any
from config import MAX_RETRIES, BACKOFF_FACTOR

def retry_with_backoff(max_retries: int = MAX_RETRIES, backoff_factor: float = BACKOFF_FACTOR):
    """Decorator for sync functions to retry on failure with exponential backoff."""
    def decorator(func: Callable):
        def wrapper(*args, **kwargs):
            retries = 0
            while retries < max_retries:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    retries += 1
                    if retries >= max_retries:
                        raise e
                    sleep_time = backoff_factor ** retries
                    print(f"[Retry Warning] Operation failed ({e}). Retrying in {sleep_time:.1f}s (Attempt {retries}/{max_retries})...")
                    time.sleep(sleep_time)
        return wrapper
    return decorator

async def async_retry_with_backoff(coro_func: Callable, *args, max_retries: int = MAX_RETRIES, backoff_factor: float = BACKOFF_FACTOR, **kwargs) -> Any:
    """Async retry helper for Playwright/httpx calls."""
    retries = 0
    while retries < max_retries:
        try:
            return await coro_func(*args, **kwargs)
        except Exception as e:
            retries += 1
            if retries >= max_retries:
                raise e
            sleep_time = backoff_factor ** retries
            print(f"[Async Retry Warning] Operation failed ({e}). Retrying in {sleep_time:.1f}s (Attempt {retries}/{max_retries})...")
            await asyncio.sleep(sleep_time)
