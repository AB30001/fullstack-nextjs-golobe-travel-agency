"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";
import { useCurrency } from "@/lib/contexts/CurrencyContext";

function getPricingLabel(pricingType, maxGroupSize) {
  if (pricingType === 'UNIT') {
    if (maxGroupSize) {
      return `per group`;
    }
    return 'per group';
  }
  return '';
}

export function ExperienceCard({ experience }) {
  const { formatPrice } = useCurrency();
  const {
    slug,
    title,
    coverImage,
    city,
    country,
    duration,
    priceRange,
    priceFrom,
    pricingType,
    maxGroupSize,
    averageRating,
    totalReviews,
    category,
  } = experience;
  
  const pricingLabel = getPricingLabel(pricingType, maxGroupSize);

  return (
    <Link href={`/experiences/${slug}`}>
      <div className="group overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl">
        <div className="relative h-48 w-full">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>
              {city}, {country}
            </span>
          </div>

          <h3 className="mb-2 line-clamp-2 text-lg font-semibold group-hover:text-blue-600">
            {title}
          </h3>

          <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>
              {duration.value} {duration.unit}
            </span>
            <span className="text-gray-400">•</span>
            <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
              {category}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-sm text-gray-600">
                ({totalReviews} reviews)
              </span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">From</div>
              <div className="text-lg font-bold">{formatPrice(priceFrom)}</div>
              {pricingLabel && (
                <div className="text-xs text-gray-500">{pricingLabel}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
