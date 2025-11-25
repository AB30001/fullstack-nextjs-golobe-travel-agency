"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useCurrency } from "@/lib/contexts/CurrencyContext";

export function SimilarExperienceCard({ experience }) {
  const { formatPrice } = useCurrency();

  return (
    <Link
      href={`/experiences/${experience.slug}`}
      className="group overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-lg"
    >
      <div className="relative h-48 w-full">
        <Image
          src={experience.coverImage}
          alt={experience.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 font-semibold text-gray-900 line-clamp-2">{experience.title}</h3>
        <div className="mb-2 flex items-center gap-1">
          <Star className="h-4 w-4 fill-black text-black" />
          <span className="font-semibold">{experience.averageRating.toFixed(1)}</span>
          <span className="text-sm text-gray-600">({experience.totalReviews})</span>
        </div>
        <div className="text-sm text-gray-600">{experience.category}</div>
        <div className="mt-2">
          <span className="text-sm text-gray-600">from </span>
          <span className="font-semibold text-gray-900">{formatPrice(experience.priceFrom)}</span>
          <span className="text-sm text-gray-600"> per adult</span>
        </div>
      </div>
    </Link>
  );
}
