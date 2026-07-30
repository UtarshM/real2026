import re
from typing import Optional, Tuple

class DataCleaner:
    @staticmethod
    def clean_text(text: Optional[str]) -> Optional[str]:
        if not text:
            return None
        # Normalize whitespace
        cleaned = re.sub(r"\s+", " ", text).strip()
        return cleaned if cleaned else None

    @staticmethod
    def extract_price_range(price_str: Optional[str]) -> Tuple[Optional[float], Optional[float]]:
        """Parse price string into min and max float values in INR."""
        if not price_str:
            return None, None
        
        text = price_str.lower().replace(",", "")
        
        # Match pattern like "₹ 45 Lac - 75 Lac" or "1.2 Cr - 2.5 Cr"
        matches = re.findall(r"(\d+(?:\.\d+)?)\s*(lac|lakh|cr|crore|k)?", text)
        if not matches:
            return None, None

        parsed_prices = []
        for num, unit in matches:
            val = float(num)
            if unit in ["lac", "lakh"]:
                val *= 100000
            elif unit in ["cr", "crore"]:
                val *= 10000000
            elif unit == "k":
                val *= 1000
            parsed_prices.append(val)

        if len(parsed_prices) == 1:
            return parsed_prices[0], parsed_prices[0]
        elif len(parsed_prices) >= 2:
            return min(parsed_prices), max(parsed_prices)
        
        return None, None

    @staticmethod
    def normalize_bhk(bhk_str: Optional[str]) -> Optional[str]:
        if not bhk_str:
            return None
        matches = re.findall(r"(\d(?:\.\d+)?)\s*bhk", bhk_str.lower())
        if matches:
            return ", ".join(f"{m} BHK" for m in matches)
        return bhk_str.strip()
