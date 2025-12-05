"use client";

import { ExternalLink, Check, Shield } from "lucide-react";
import { useCurrency } from "@/lib/contexts/CurrencyContext";

function getPricingLabel(experience) {
  if (experience.pricingType === 'UNIT') {
    if (experience.maxGroupSize) {
      return `per group (up to ${experience.maxGroupSize})`;
    }
    return 'per group';
  }
  return 'per adult';
}

export function BookingSidebar({ experience }) {
  const { formatPrice } = useCurrency();
  const pricingLabel = getPricingLabel(experience);
  const checkoutLink = experience.affiliateLink || '#';
  
  return (
    <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
      <div className="mb-6">
        <div className="text-sm text-gray-600">From</div>
        <div className="text-3xl font-bold">{formatPrice(experience.priceFrom)}</div>
        <div className="text-sm text-gray-600">{pricingLabel}</div>
      </div>

      <a
        href={checkoutLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-base font-semibold text-white transition-colors"
        style={{ backgroundColor: '#186b6d' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#155a5c'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#186b6d'}
      >
        Check Availability
        <ExternalLink className="h-4 w-4" />
      </a>
      
      <div className="mb-4 text-center text-sm text-gray-600">
        Select your date and travelers on Viator
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-green-700">
          <Check className="h-4 w-4" />
          <span className="font-medium">Free cancellation</span>
        </div>
        <div className="text-xs text-gray-600">
          Full refund if cancelled up to 24 hours before the experience starts (local time).
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <Shield className="h-4 w-4" />
          <span className="font-medium">Reserve now & pay later</span>
        </div>
        <div className="text-xs text-gray-600">
          Secure your spot while staying flexible.
        </div>
      </div>

      <div className="mb-4 rounded-lg bg-green-50 p-3 text-center">
        <div className="text-sm font-semibold text-green-800">
          Lowest price guarantee
        </div>
        <div className="text-xs text-green-700">
          Find a lower price online? Get the difference refunded!
        </div>
      </div>

      <div className="border-t pt-4 text-center text-xs text-gray-500">
        Powered by {experience.affiliatePartner}
      </div>
    </div>
  );
}
