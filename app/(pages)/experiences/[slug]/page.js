import { getExperienceBySlug, getExperienceReviews } from "@/lib/services/experiences";
import { notFound } from "next/navigation";
import { Star, MapPin, Clock, Users, Calendar } from "lucide-react";
import { ReviewsList } from "@/components/experiences/ReviewsList";
import { Breadcrumb } from "@/components/experiences/Breadcrumb";
import { ExperienceTabs } from "@/components/experiences/ExperienceTabs";
import { RatingBadge } from "@/components/experiences/RatingBadge";
import { ShareSaveButtons } from "@/components/experiences/ShareSaveButtons";
import { WhyTravelersLove } from "@/components/experiences/WhyTravelersLove";
import { BookingSidebar } from "@/components/experiences/BookingSidebar";
import { MeetingPickup } from "@/components/experiences/MeetingPickup";
import { AdditionalInfo } from "@/components/experiences/AdditionalInfo";
import { CancellationPolicy } from "@/components/experiences/CancellationPolicy";
import { WhatsIncluded } from "@/components/experiences/WhatsIncluded";
import { ItinerarySection } from "@/components/experiences/ItinerarySection";
import { SimilarExperiences } from "@/components/experiences/SimilarExperiences";
import { ImageGallery } from "@/components/experiences/ImageGallery";
import { StickyMobileBar } from "@/components/experiences/StickyMobileBar";

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

  const reviews = await getExperienceReviews(experience._id, { limit: 10 });
  const images = experience.images && experience.images.length > 0 
    ? experience.images 
    : [experience.coverImage];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <Breadcrumb country={experience.country} city={experience.city} title={experience.title} />

        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{experience.title}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <RatingBadge
                rating={experience.averageRating}
                totalReviews={experience.totalReviews}
              />
            </div>
          </div>
          <ShareSaveButtons />
        </div>

        <ImageGallery images={images} title={experience.title} />

        <ExperienceTabs activeTab="Overview" />

        <div id="overview" className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-bold">About</h2>
              <p className="mb-4 text-gray-700">{experience.description}</p>
              {experience.longDescription && (
                <p className="text-gray-700">{experience.longDescription}</p>
              )}
            </div>

            {experience.highlights && experience.highlights.length > 0 && (
              <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-2xl font-bold">Highlights</h2>
                <ul className="space-y-3">
                  {experience.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black"></span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-bold">Quick info</h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-semibold">Duration</div>
                    <div className="text-sm text-gray-600">
                      {experience.duration.value} {experience.duration.unit}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="mt-1 h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-semibold">Languages</div>
                    <div className="text-sm text-gray-600">
                      {experience.languagesOffered?.join(", ") || "English"}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-semibold">Mobile ticket</div>
                    <div className="text-sm text-gray-600">Accepted</div>
                  </div>
                </div>
              </div>
            </div>

            <div id="whats-included">
              <WhatsIncluded 
                inclusions={experience.inclusions} 
                exclusions={experience.exclusions} 
              />
            </div>

            <div id="meeting-and-pickup">
              <MeetingPickup 
                meetingPoint={experience.meetingPoint}
                endPoint={experience.endPoint}
                travelerPickup={experience.travelerPickup}
              />
            </div>

            <div id="what-to-expect">
              <ItinerarySection itinerary={experience.itinerary} />
            </div>

            <div id="additional-info">
              <AdditionalInfo 
                additionalInfo={experience.additionalInfo}
                languageGuides={experience.languageGuides}
              />
            </div>

            <div id="cancellation-policy">
              <CancellationPolicy cancellationPolicy={experience.cancellationPolicy} />
            </div>

            <div id="reviews" className="mb-8 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
              <div className="mb-6 flex items-center gap-4">
                <div className="text-5xl font-bold">{experience.averageRating.toFixed(1)}</div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-5 w-5 ${
                          idx < Math.round(experience.averageRating)
                            ? "fill-black text-black"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    {experience.totalReviews.toLocaleString()} reviews
                  </div>
                </div>
              </div>
              <ReviewsList 
                reviews={reviews} 
                experienceId={experience._id}
                totalReviews={experience.totalReviews}
                rating={experience.averageRating.toFixed(1)}
                affiliateLink={experience.affiliateLink}
              />
            </div>

            <SimilarExperiences
              country={experience.country}
              category={experience.category}
              currentId={experience._id}
            />
          </div>

          <div className="lg:col-span-1">
            <BookingSidebar experience={experience} />
          </div>
        </div>
      </div>
      
      <StickyMobileBar 
        price={experience.priceFrom}
        affiliateLink={experience.affiliateLink}
        pricingType={experience.pricingType}
        maxGroupSize={experience.maxGroupSize}
      />
    </div>
  );
}
