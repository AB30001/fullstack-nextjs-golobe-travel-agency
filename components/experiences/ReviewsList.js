import { Star, ThumbsUp, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

export function ReviewsList({ reviews, experienceId, totalReviews, rating, affiliateLink }) {
  if (reviews.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="mb-6 text-gray-700">
          This experience has <strong>{totalReviews} verified reviews</strong> with an average rating of <strong>{rating}/5.0</strong> on Viator.
        </p>
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Read Reviews on Viator
          <ExternalLink className="h-5 w-5" />
        </a>
        <p className="mt-4 text-sm text-gray-500">
          View authentic traveler reviews and book your experience on Viator
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review._id} className="border-b pb-6 last:border-0">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                {review.reviewerAvatar ? (
                  <Image
                    src={review.reviewerAvatar}
                    alt={review.reviewerName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-gray-600">
                    {review.reviewerName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold">{review.reviewerName}</div>
                {review.reviewerCountry && (
                  <div className="text-sm text-gray-600">
                    {review.reviewerCountry}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{review.rating}</span>
              </div>
              <div className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>

          {review.title && (
            <h4 className="mb-2 font-semibold">{review.title}</h4>
          )}

          <p className="mb-3 text-gray-700">{review.comment}</p>

          {review.travelDate && (
            <div className="mb-2 text-sm text-gray-600">
              Traveled: {new Date(review.travelDate).toLocaleDateString()}
              {review.travelType && ` • ${review.travelType}`}
            </div>
          )}

          {review.photos && review.photos.length > 0 && (
            <div className="mb-3 flex gap-2">
              {review.photos.slice(0, 3).map((photo, idx) => (
                <div key={idx} className="relative h-20 w-20">
                  <Image
                    src={photo}
                    alt={`Review photo ${idx + 1}`}
                    fill
                    className="rounded object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {review.verified && (
            <div className="mb-2 text-sm text-green-600">✓ Verified booking</div>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <button className="flex items-center gap-1 hover:text-gray-900">
              <ThumbsUp className="h-4 w-4" />
              Helpful {review.helpfulCount > 0 && `(${review.helpfulCount})`}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
