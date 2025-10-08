import { Experience, ExperienceReview } from "@/lib/db/models";
import { getOperationDB } from "@/lib/db/getOperationDB";

/**
 * Get all experiences with optional filters
 */
export async function getAllExperiences(filters = {}) {
  const {
    country,
    category,
    priceRange,
    minRating,
    search,
    limit = 20,
    skip = 0,
    sort = { averageRating: -1 },
  } = filters;

  const query = { isActive: true };

  if (country) query.country = country;
  if (category) query.category = category;
  if (priceRange) query.priceRange = priceRange;
  if (minRating) query.averageRating = { $gte: minRating };
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { city: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  try {
    const experiences = await Experience.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean();

    return experiences;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

/**
 * Get a single experience by slug
 */
export async function getExperienceBySlug(slug) {
  try {
    const experience = await Experience.findOne({ slug, isActive: true }).lean();
    return experience || null;
  } catch (error) {
    console.error("Error fetching experience:", error);
    return null;
  }
}

/**
 * Get reviews for an experience
 */
export async function getExperienceReviews(experienceId, options = {}) {
  const { limit = 10, skip = 0, sort = { createdAt: -1 } } = options;

  try {
    const reviews = await ExperienceReview.find({
      experienceId,
      isVisible: true,
    })
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .lean();

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

/**
 * Get experiences by country
 */
export async function getExperiencesByCountry(country, limit = 12) {
  return getAllExperiences({ country, limit, sort: { averageRating: -1 } });
}

/**
 * Get top-rated experiences
 */
export async function getTopRatedExperiences(limit = 10) {
  return getAllExperiences({
    limit,
    minRating: 4,
    sort: { averageRating: -1, totalReviews: -1 },
  });
}

/**
 * Get experiences by category
 */
export async function getExperiencesByCategory(category, limit = 12) {
  return getAllExperiences({ category, limit });
}

/**
 * Search experiences
 */
export async function searchExperiences(searchTerm, filters = {}) {
  return getAllExperiences({ ...filters, search: searchTerm });
}

/**
 * Get featured experiences for homepage
 */
export async function getFeaturedExperiences() {
  // Get a mix of top-rated from different countries
  const countries = ["Norway", "Iceland", "Sweden", "Finland", "Denmark"];
  const featured = [];

  for (const country of countries) {
    const experiences = await getExperiencesByCountry(country, 2);
    featured.push(...experiences);
  }

  return featured.slice(0, 10);
}

/**
 * Calculate and update average rating for an experience
 */
export async function updateExperienceRating(experienceId) {
  try {
    const reviews = await ExperienceReview.find({
      experienceId,
      isVisible: true,
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

    await Experience.updateOne(
      { _id: experienceId },
      { averageRating: Math.round(averageRating * 10) / 10, totalReviews }
    );

    return { averageRating, totalReviews };
  } catch (error) {
    console.error("Error updating experience rating:", error);
    return null;
  }
}
