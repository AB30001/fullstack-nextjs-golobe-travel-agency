import { getExperienceBySlug, getExperienceReviews } from "@/lib/services/experiences";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, MapPin, Clock, Users, Calendar, ExternalLink } from "lucide-react";
import { ReviewsList } from "@/components/experiences/ReviewsList";

export async function generateMetadata({ params }) {
  const experience = await getExperienceBySlug(params.slug);
  
  if (!experience) {
    return {
      title: "Experience Not Found",
    };
  }

  return {
    title: `${experience.title} | Nordic Experiences`,
    description: experience.description,
  };
}

export default async function ExperienceDetailPage({ params }) {
  const experience = await getExperienceBySlug(params.slug);

  if (!experience) {
    return notFound();
  }

  const reviews = await getExperienceReviews(experience._id, { limit: 5 });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Image Gallery */}
        <div className="mb-8 grid gap-2 md:grid-cols-4">
          <div className="relative h-[400px] md:col-span-3">
            <Image
              src={experience.coverImage}
              alt={experience.title}
              fill
              className="rounded-lg object-cover"
              sizes="75vw"
              priority
            />
          </div>
          <div className="grid gap-2">
            {experience.images.slice(0, 2).map((image, idx) => (
              <div key={idx} className="relative h-[196px]">
                <Image
                  src={image}
                  alt={`${experience.title} ${idx + 1}`}
                  fill
                  className="rounded-lg object-cover"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>
                {experience.city}, {experience.country}
              </span>
            </div>

            <h1 className="mb-4 text-3xl font-bold">{experience.title}</h1>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {experience.averageRating.toFixed(1)}
                </span>
                <span className="text-gray-600">
                  ({experience.totalReviews} reviews)
                </span>
              </div>
              <span className="rounded bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {experience.category}
              </span>
            </div>

            {/* Quick Info */}
            <div className="mb-8 grid gap-4 rounded-lg bg-white p-6 shadow-md sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="font-semibold">
                    {experience.duration.value} {experience.duration.unit}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-600">Languages</div>
                  <div className="font-semibold">
                    {experience.languagesOffered?.join(", ") || "English"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-600">Availability</div>
                  <div className="font-semibold">Check dates</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-bold">About this experience</h2>
              <p className="mb-4 text-gray-700">{experience.description}</p>
              {experience.longDescription && (
                <p className="text-gray-700">{experience.longDescription}</p>
              )}
            </div>

            {/* Highlights */}
            {experience.highlights && experience.highlights.length > 0 && (
              <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-2xl font-bold">Highlights</h2>
                <ul className="space-y-2">
                  {experience.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600"></span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What's Included */}
            {experience.included && experience.included.length > 0 && (
              <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-2xl font-bold">What's included</h2>
                <ul className="space-y-2">
                  {experience.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 text-green-600">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
              <ReviewsList reviews={reviews} experienceId={experience._id} />
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4">
                <div className="text-sm text-gray-600">From</div>
                <div className="text-3xl font-bold">${experience.priceFrom}</div>
                <div className="text-sm text-gray-600">per person</div>
              </div>

              <a
                href={experience.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Check Availability
                <ExternalLink className="h-4 w-4" />
              </a>

              <div className="mb-4 text-center text-xs text-gray-500">
                Powered by {experience.affiliatePartner}
              </div>

              {experience.meetingPoint && (
                <div className="border-t pt-4">
                  <div className="mb-2 font-semibold">Meeting Point</div>
                  <p className="text-sm text-gray-600">{experience.meetingPoint}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
