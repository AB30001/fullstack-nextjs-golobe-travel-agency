import { getExperiencesByCountry } from "@/lib/services/experiences";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import Image from "next/image";
import { notFound } from "next/navigation";

const COUNTRY_DATA = {
  Norway: {
    name: "Norway",
    image: "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627",
    description:
      "Experience the majestic fjords, northern lights, and stunning natural landscapes of Norway. From the vibrant cities of Oslo and Bergen to the remote wilderness of Svalbard, Norway offers unforgettable adventures.",
    highlights: [
      "See the Northern Lights in Tromsø",
      "Cruise through the spectacular Geirangerfjord",
      "Hike to Trolltunga and Preikestolen",
      "Explore the historic Bryggen in Bergen",
    ],
  },
  Iceland: {
    name: "Iceland",
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927",
    description:
      "Discover the land of fire and ice with its dramatic volcanic landscapes, massive glaciers, and geothermal wonders. Iceland offers unique experiences from glacier hiking to bathing in hot springs.",
    highlights: [
      "Chase the Northern Lights across the country",
      "Explore the Golden Circle route",
      "Relax in the Blue Lagoon",
      "Hike on Vatnajökull glacier",
    ],
  },
  Sweden: {
    name: "Sweden",
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11",
    description:
      "From Stockholm's archipelago to the wilderness of Swedish Lapland, Sweden combines cosmopolitan culture with pristine nature. Discover ancient Viking history and modern Scandinavian design.",
    highlights: [
      "Experience the Icehotel in Jukkasjärvi",
      "Kayak through Stockholm's archipelago",
      "Visit the ABBA Museum",
      "See the Midnight Sun in summer",
    ],
  },
  Finland: {
    name: "Finland",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    description:
      "Finland's pristine wilderness, thousands of lakes, and unique culture offer a truly special Nordic experience. From meeting Santa in Lapland to enjoying Finnish saunas, there's magic in every season.",
    highlights: [
      "Meet Santa Claus in Rovaniemi",
      "Experience traditional Finnish sauna",
      "See the Northern Lights in Lapland",
      "Go husky sledding through snowy forests",
    ],
  },
  Denmark: {
    name: "Denmark",
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc",
    description:
      "Denmark combines fairy-tale castles, modern design, and coastal beauty. Explore Copenhagen's vibrant culture, visit historic castles, and discover the concept of 'hygge' - Danish coziness.",
    highlights: [
      "Visit Tivoli Gardens in Copenhagen",
      "Explore Kronborg Castle (Hamlet's castle)",
      "See the Little Mermaid statue",
      "Bike through Copenhagen's streets",
    ],
  },
};

export async function generateMetadata({ params }) {
  const countryData = COUNTRY_DATA[params.country];

  if (!countryData) {
    return {
      title: "Country Not Found",
    };
  }

  return {
    title: `${countryData.name} Tours & Experiences | Nordic Adventures`,
    description: countryData.description,
  };
}

export default async function CountryPage({ params }) {
  const countryData = COUNTRY_DATA[params.country];

  if (!countryData) {
    return notFound();
  }

  const experiences = await getExperiencesByCountry(params.country, 20);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image
          src={countryData.image}
          alt={countryData.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white md:p-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {countryData.name}
          </h1>
          <p className="max-w-2xl text-lg">{countryData.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Highlights */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Top Experiences</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {countryData.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600"></span>
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Experiences Grid */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">
            All Experiences in {countryData.name}
          </h2>
          {experiences.length === 0 ? (
            <div className="rounded-lg bg-white p-12 text-center">
              <p className="text-gray-600">
                No experiences available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {experiences.map((experience) => (
                <ExperienceCard key={experience._id} experience={experience} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
