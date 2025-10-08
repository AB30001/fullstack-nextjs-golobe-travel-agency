import { getAllExperiences } from "@/lib/services/experiences";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { ExperienceFilters } from "@/components/experiences/ExperienceFilters";

export const metadata = {
  title: "Nordic Experiences & Tours | Discover the Best of Scandinavia",
  description:
    "Explore amazing tours and experiences across Norway, Iceland, Sweden, Finland, and Denmark. From Northern Lights to Fjord tours, find your perfect Nordic adventure.",
};

export default async function ExperiencesPage({ searchParams }) {
  const filters = {
    country: searchParams.country,
    category: searchParams.category,
    priceRange: searchParams.price,
    minRating: searchParams.rating ? parseFloat(searchParams.rating) : undefined,
    search: searchParams.q,
  };

  const experiences = await getAllExperiences(filters);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          {filters.country
            ? `Experiences in ${filters.country}`
            : "Nordic Experiences & Tours"}
        </h1>

        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0">
            <ExperienceFilters currentFilters={filters} />
          </aside>

          <main className="flex-1">
            {experiences.length === 0 ? (
              <div className="rounded-lg bg-white p-12 text-center">
                <p className="text-gray-600">
                  No experiences found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {experiences.map((experience) => (
                  <ExperienceCard key={experience._id} experience={experience} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
