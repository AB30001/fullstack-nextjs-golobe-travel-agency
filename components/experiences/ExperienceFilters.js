"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const COUNTRIES = ["Norway", "Iceland", "Sweden", "Finland", "Denmark"];
const CATEGORIES = [
  "Northern Lights",
  "Fjord Tours",
  "Wildlife Safari",
  "Hiking & Trekking",
  "Winter Sports",
  "Cultural Tours",
  "Food & Drink",
  "Boat Tours",
  "City Tours",
  "Adventure Sports",
  "Nature & Wildlife",
  "Photography Tours",
  "Historical Sites",
  "Multi-day Tours",
];
const PRICE_RANGES = ["$", "$$", "$$$", "$$$$"];
const RATINGS = [
  { label: "4+ stars", value: "4" },
  { label: "3+ stars", value: "3" },
];

function FilterContent({ currentFilters, updateFilter, clearFilters, isMobile }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 font-medium">Country</h3>
        <select
          value={currentFilters.country || ""}
          onChange={(e) => updateFilter("country", e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2.5"
        >
          <option value="">All Countries</option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Category</h3>
        <select
          value={currentFilters.category || ""}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2.5"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Price Range</h3>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((price) => (
            <button
              key={price}
              onClick={() => updateFilter("price", currentFilters.priceRange === price ? "" : price)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                currentFilters.priceRange === price
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {price}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Rating</h3>
        <div className="flex flex-wrap gap-2">
          {RATINGS.map((rating) => (
            <button
              key={rating.value}
              onClick={() => updateFilter("rating", currentFilters.minRating?.toString() === rating.value ? "" : rating.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                currentFilters.minRating?.toString() === rating.value
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {rating.label}
            </button>
          ))}
        </div>
      </div>

      {!isMobile && (
        <button
          onClick={clearFilters}
          className="w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

export function ExperienceFilters({ currentFilters }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      
      router.push(`/experiences?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearFilters = () => {
    router.push("/experiences");
    setIsOpen(false);
  };

  const activeFilterCount = [
    currentFilters.country,
    currentFilters.category,
    currentFilters.priceRange,
    currentFilters.minRating
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium shadow-sm"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <FilterContent 
              currentFilters={currentFilters} 
              updateFilter={updateFilter} 
              clearFilters={clearFilters}
              isMobile={true}
            />
            <div className="mt-6 flex gap-3 border-t pt-4">
              <button
                onClick={clearFilters}
                className="flex-1 rounded-lg border border-gray-300 py-3 font-medium"
              >
                Clear all
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-lg bg-black py-3 font-semibold text-white"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block space-y-6 rounded-lg bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear all
          </button>
        </div>
        <FilterContent 
          currentFilters={currentFilters} 
          updateFilter={updateFilter} 
          clearFilters={clearFilters}
          isMobile={false}
        />
      </div>
    </>
  );
}
