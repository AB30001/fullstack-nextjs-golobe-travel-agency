import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/experiences/SearchBar";
import { CountryCard } from "@/components/experiences/CountryCard";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { getFeaturedExperiences, getTopRatedExperiences } from "@/lib/services/experiences";
import { Footer } from "@/components/sections/Footer";
import { NavMinimal } from "@/components/sections/NavMinimal";

export const metadata = {
  title: "Nordic Experiences | Tours & Adventures in Scandinavia",
  description:
    "Discover amazing tours and experiences in Norway, Iceland, Sweden, Finland, and Denmark. Find Northern Lights tours, fjord cruises, wildlife safaris, and more.",
  keywords: [
    "Nordic tours",
    "Scandinavia experiences",
    "Northern Lights",
    "Norway tours",
    "Iceland tours",
    "Sweden tours",
    "Finland tours",
    "Denmark tours",
  ],
};

const NORDIC_COUNTRIES = [
  {
    name: "Norway",
    slug: "norway",
    image: "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627",
    description: "Fjords, Northern Lights & Mountains",
  },
  {
    name: "Iceland",
    slug: "iceland",
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927",
    description: "Glaciers, Volcanoes & Hot Springs",
  },
  {
    name: "Sweden",
    slug: "sweden",
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11",
    description: "Archipelagos, Culture & Nature",
  },
  {
    name: "Finland",
    slug: "finland",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    description: "Lapland, Saunas & Northern Lights",
  },
  {
    name: "Denmark",
    slug: "denmark",
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc",
    description: "Copenhagen, Castles & Coastal Beauty",
  },
];

export default async function HomePage() {
  const topRated = await getTopRatedExperiences(8);
  const featured = await getFeaturedExperiences();

  return (
    <>
      {/* Hero Section */}
      <header className="relative mb-16 h-[600px] bg-gray-900">
        <NavMinimal />
        
        <Image
          src="https://images.unsplash.com/photo-1536514072410-5019a3c69182"
          alt="Nordic landscape"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-white">
          <h1 className="mb-4 text-center text-5xl font-bold drop-shadow-lg md:text-6xl lg:text-7xl">
            Discover Nordic <br className="hidden md:block" />
            Adventures
          </h1>
          <p className="mb-8 text-center text-xl drop-shadow-md md:text-2xl">
            Explore unforgettable experiences across Scandinavia
          </p>
          
          <div className="w-full max-w-3xl">
            <SearchBar />
          </div>
        </div>
      </header>

      <main className="mx-auto mb-16 w-[90%] max-w-7xl space-y-16">
        {/* Browse by Country */}
        <section>
          <h2 className="mb-8 text-3xl font-bold">Explore by Country</h2>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {NORDIC_COUNTRIES.map((country) => (
              <CountryCard key={country.slug} country={country} />
            ))}
          </div>
        </section>

        {/* Top Rated Experiences */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Top-Rated Experiences</h2>
            <Link
              href="/experiences?rating=4"
              className="text-blue-600 hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {topRated.map((experience) => (
              <ExperienceCard key={experience._id} experience={experience} />
            ))}
          </div>
        </section>

        {/* Popular Categories */}
        <section>
          <h2 className="mb-8 text-3xl font-bold">Popular Categories</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/experiences?category=Northern Lights"
              className="group relative h-48 overflow-hidden rounded-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1483347756197-71ef80e95f73"
                alt="Northern Lights"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">Northern Lights</h3>
              </div>
            </Link>

            <Link
              href="/experiences?category=Fjord Tours"
              className="group relative h-48 overflow-hidden rounded-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38"
                alt="Fjord Tours"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">Fjord Tours</h3>
              </div>
            </Link>

            <Link
              href="/experiences?category=Wildlife Safari"
              className="group relative h-48 overflow-hidden rounded-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19"
                alt="Wildlife Safari"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">Wildlife Safari</h3>
              </div>
            </Link>

            <Link
              href="/experiences?category=Cultural Tours"
              className="group relative h-48 overflow-hidden rounded-lg"
            >
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3"
                alt="Cultural Tours"
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">Cultural Tours</h3>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
