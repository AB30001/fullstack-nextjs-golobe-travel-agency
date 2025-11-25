import { getExperiencesWithPagination } from "@/lib/services/experiences";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { ExperienceFilters } from "@/components/experiences/ExperienceFilters";
import { Pagination } from "@/components/ui/Pagination";

export const metadata = {
  title: "Nordic Experiences & Tours | Discover the Best of Scandinavia",
  description:
    "Explore amazing tours and experiences across Norway, Iceland, Sweden, Finland, and Denmark. From Northern Lights to Fjord tours, find your perfect Nordic adventure.",
};

export default async function ExperiencesPage({ searchParams }) {
  // Sanitize page parameter to ensure it's a valid positive integer
  const rawPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const filters = {
    country: searchParams.country,
    category: searchParams.category,
    priceRange: searchParams.price,
    minRating: searchParams.rating ? parseFloat(searchParams.rating) : undefined,
    search: searchParams.q,
    page,
  };

  const { experiences, pagination } = await getExperiencesWithPagination(filters);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          {filters.country
            ? `Experiences in ${filters.country}`
            : "Nordic Experiences & Tours"}
        </h1>

        {/* Mobile Filter Button */}
        <div className="mb-4 lg:hidden">
          <ExperienceFilters currentFilters={filters} />
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 flex-shrink-0 lg:block">
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
              <>
                <div className="mb-4 text-sm text-gray-600">
                  {pagination.total} {pagination.total === 1 ? 'result' : 'results'}
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {experiences.map((experience) => (
                    <ExperienceCard key={experience._id} experience={experience} />
                  ))}
                </div>

                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  baseUrl="/experiences"
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
