import { Star, User } from "lucide-react";

export function WhyTravelersLove({ reviews }) {
  const featuredReviews = reviews.filter((r) => r.rating === 5).slice(0, 3);

  if (featuredReviews.length === 0) return null;

  return (
    <div className="mb-8 rounded-lg bg-gradient-to-br from-blue-50 to-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Why travelers love this</h2>
      <p className="mb-4 text-sm text-gray-600">
        The most recent 5-bubble reviews, displayed for experiences rated as very good or higher.
      </p>
      <div className="space-y-4">
        {featuredReviews.map((review, idx) => (
          <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="font-semibold">{review.reviewerName || "Traveler"}</div>
                  <div className="text-xs text-gray-500">
                    Written {new Date(review.reviewDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-black text-black" />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-700">
              {review.reviewText?.length > 250
                ? review.reviewText.substring(0, 250) + "..."
                : review.reviewText}
            </p>
            {review.reviewText?.length > 250 && (
              <button className="mt-2 text-sm font-semibold text-black hover:underline">
                Read more
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
