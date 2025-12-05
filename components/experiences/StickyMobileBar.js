"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Heart } from "lucide-react";
import { useCurrency } from "@/lib/contexts/CurrencyContext";

function getPricingLabel(pricingType, maxGroupSize) {
  if (pricingType === 'UNIT') {
    if (maxGroupSize) {
      return `per group (up to ${maxGroupSize})`;
    }
    return 'per group';
  }
  return 'per person';
}

export function StickyMobileBar({ price, affiliateLink, pricingType, maxGroupSize }) {
  const { formatPrice } = useCurrency();
  const pricingLabel = getPricingLabel(pricingType, maxGroupSize);
  const [isVisible, setIsVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const checkoutLink = affiliateLink || '#';

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(!isSaved);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.1)] lg:hidden">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600">from</span>
              <span className="text-xl font-bold">
                {formatPrice(price)}
              </span>
            </div>
            <div className="text-xs text-gray-500">{pricingLabel}</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors hover:bg-gray-50"
              aria-label="Save to wishlist"
            >
              <Heart
                className={`h-5 w-5 ${
                  isSaved ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </button>

            <a
              href={checkoutLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-white transition-colors"
              style={{ backgroundColor: '#186b6d' }}
            >
              <span className="whitespace-nowrap text-sm">Check Availability</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
