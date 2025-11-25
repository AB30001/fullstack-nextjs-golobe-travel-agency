import { SimilarExperienceCard } from "./SimilarExperienceCard";

export async function SimilarExperiences({ country, category, currentId }) {
  const { getAllExperiences } = await import("@/lib/services/experiences");
  
  const experiences = await getAllExperiences({
    country,
    category,
    limit: 3,
  });

  const filtered = experiences.filter((exp) => exp._id.toString() !== currentId.toString());

  if (filtered.length === 0) return null;

  const serialized = filtered.slice(0, 3).map((exp) => ({
    _id: exp._id.toString(),
    slug: exp.slug,
    title: exp.title,
    coverImage: exp.coverImage,
    averageRating: exp.averageRating,
    totalReviews: exp.totalReviews,
    category: exp.category,
    priceFrom: exp.priceFrom,
  }));

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Similar experiences</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {serialized.map((exp) => (
          <SimilarExperienceCard key={exp._id} experience={exp} />
        ))}
      </div>
    </div>
  );
}
