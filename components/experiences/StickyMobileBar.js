"use client";

import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

export function StickyMobileBar({ price, affiliateLink }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm text-gray-600">From</div>
          <div className="text-2xl font-bold">${price}</div>
        </div>
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white"
        >
          Check Availability
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
