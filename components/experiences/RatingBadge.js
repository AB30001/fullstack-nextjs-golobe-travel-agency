import { Star } from "lucide-react";

export function RatingBadge({ rating, totalReviews, recommendedPercent }) {
  const recommended = recommendedPercent || Math.round((rating / 5) * 100);
  
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 shadow-sm">
          <span className="text-2xl font-bold">{rating.toFixed(1)}</span>
        </div>
        <div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, idx) => (
              <Star
                key={idx}
                className={`h-4 w-4 ${
                  idx < Math.round(rating)
                    ? "fill-black text-black"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            ({totalReviews?.toLocaleString()} reviews)
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-700">
        <span className="font-semibold">Recommended by {recommended}% of travelers</span>
      </div>
      <div className="text-xs text-gray-600">
        {recommended}% of reviewers gave this product a bubble rating of 4 or higher.
      </div>
    </div>
  );
}
