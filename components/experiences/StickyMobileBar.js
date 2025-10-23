"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Heart } from "lucide-react";

export function StickyMobileBar({ price, affiliateLink }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.1)]">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Price section */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600">from</span>
              <span className="text-xl font-bold sm:text-2xl">
                ${price}
              </span>
              <span className="text-sm text-gray-600">per person</span>
            </div>
            <div className="text-xs text-gray-600 sm:text-sm">
              Lowest Price Guarantee
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Save/Heart button */}
            <button
              onClick={handleSave}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors hover:bg-gray-50 sm:h-12 sm:w-12"
              aria-label="Save to wishlist"
            >
              <Heart
                className={`h-5 w-5 sm:h-6 sm:w-6 ${
                  isSaved ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </button>

            {/* Check Availability button */}
            <a
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 sm:px-6"
            >
              <span className="whitespace-nowrap text-sm sm:text-base">
                Check Availability
              </span>
              <ExternalLink className="hidden h-4 w-4 sm:block" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
