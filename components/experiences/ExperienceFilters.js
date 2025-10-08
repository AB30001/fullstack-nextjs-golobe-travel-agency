"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

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

export function ExperienceFilters({ currentFilters }) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
  };

  return (
    <div className="space-y-6 rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Country</h3>
        <select
          value={currentFilters.country || ""}
          onChange={(e) => updateFilter("country", e.target.value)}
          className="w-full rounded border border-gray-300 p-2"
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
          className="w-full rounded border border-gray-300 p-2"
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
        <div className="space-y-1">
          {PRICE_RANGES.map((price) => (
            <label key={price} className="flex items-center gap-2">
              <input
                type="radio"
                name="price"
                value={price}
                checked={currentFilters.priceRange === price}
                onChange={(e) => updateFilter("price", e.target.value)}
                className="h-4 w-4"
              />
              <span>{price}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-medium">Rating</h3>
        <div className="space-y-1">
          {RATINGS.map((rating) => (
            <label key={rating.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="rating"
                value={rating.value}
                checked={currentFilters.minRating?.toString() === rating.value}
                onChange={(e) => updateFilter("rating", e.target.value)}
                className="h-4 w-4"
              />
              <span>{rating.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
