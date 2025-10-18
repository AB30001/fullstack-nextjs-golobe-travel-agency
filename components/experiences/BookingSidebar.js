"use client";

import { useState } from "react";
import { Calendar, Users, ExternalLink, Check, Shield } from "lucide-react";

export function BookingSidebar({ experience }) {
  const [travelers, setTravelers] = useState(2);
  const [selectedDate, setSelectedDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
      <div className="mb-4">
        <div className="text-sm text-gray-600">From</div>
        <div className="text-3xl font-bold">${experience.priceFrom}</div>
        <div className="text-sm text-gray-600">per adult</div>
      </div>

      <div className="mb-4 space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Select date
          </label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Travelers
          </label>
          <div className="relative">
            <Users className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="w-full appearance-none rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "traveler" : "travelers"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <a
        href={experience.affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-6 py-3.5 font-semibold text-white transition-colors hover:bg-gray-800"
      >
        Check Availability
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
