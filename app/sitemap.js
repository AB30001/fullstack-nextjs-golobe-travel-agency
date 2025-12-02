import mongoose from "mongoose";
import { Experience } from "@/lib/db/models";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://nordexplore.com";

export default async function sitemap() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
    } catch (e) {
      console.error("Sitemap DB connection error:", e);
    }
  }

  const experiences = await Experience.find({ isActive: true })
    .select("slug updatedAt country category")
    .lean();

  const experienceUrls = experiences.map((experience) => ({
    url: `${BASE_URL}/experiences/${experience.slug}`,
    lastModified: experience.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const countries = ["norway", "iceland", "sweden", "finland", "denmark"];
  const countryUrls = countries.map((country) => ({
    url: `${BASE_URL}/experiences?country=${country.charAt(0).toUpperCase() + country.slice(1)}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  const categories = [
    "Northern Lights",
    "Fjord Tours",
    "Wildlife Safari",
    "Hiking & Trekking",
    "Winter Sports",
    "Cultural Tours",
    "Food & Drink",
    "Boat Tours",
    "City Tours",
    "Adventure Sports",
    "Nature & Wildlife",
    "Photography Tours",
  ];
  const categoryUrls = categories.map((category) => ({
    url: `${BASE_URL}/experiences?category=${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/experiences`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...staticPages, ...countryUrls, ...categoryUrls, ...experienceUrls];
}
