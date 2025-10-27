"use client";

import { ExternalLink, Check, Shield } from "lucide-react";

export function BookingSidebar({ experience }) {
  return (
    <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
      <div className="mb-4">
        <div className="text-sm text-gray-600">From</div>
        <div className="text-3xl font-bold">${experience.priceFrom}</div>
        <div className="text-sm text-gray-600">per adult</div>
      </div>

      <a
        href={experience.affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-teal-700"
      >
        Learn More
        <ExternalLink className="h-4 w-4" />
      </a>

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
