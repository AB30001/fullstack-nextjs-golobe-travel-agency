import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export async function SimilarExperiences({ country, category, currentId }) {
  const { getAllExperiences } = await import("@/lib/services/experiences");
  
  const experiences = await getAllExperiences({
    country,
    category,
    limit: 3,
  });

  const filtered = experiences.filter((exp) => exp._id.toString() !== currentId.toString());

  if (filtered.length === 0) return null;

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Similar experiences</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 3).map((exp) => (
          <Link
            key={exp._id.toString()}
            href={`/experiences/${exp.slug}`}
            className="group overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-lg"
          >
            <div className="relative h-48 w-full">
              <Image
                src={exp.coverImage}
                alt={exp.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-2 font-semibold text-gray-900 line-clamp-2">{exp.title}</h3>
              <div className="mb-2 flex items-center gap-1">
                <Star className="h-4 w-4 fill-black text-black" />
                <span className="font-semibold">{exp.averageRating.toFixed(1)}</span>
                <span className="text-sm text-gray-600">({exp.totalReviews})</span>
              </div>
              <div className="text-sm text-gray-600">{exp.category}</div>
              <div className="mt-2">
                <span className="text-sm text-gray-600">from </span>
                <span className="font-semibold text-gray-900">${exp.priceFrom}</span>
                <span className="text-sm text-gray-600"> {exp.pricingDetails || 'per adult'}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
