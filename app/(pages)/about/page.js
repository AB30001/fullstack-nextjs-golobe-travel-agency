import Image from "next/image";
import Link from "next/link";
import { Mountain, Heart, Globe, Users, Award, Compass } from "lucide-react";

export const metadata = {
  title: "Our Story",
  description: "Learn about NordExplore - your gateway to authentic Nordic adventures across Norway, Iceland, Sweden, Finland, and Denmark.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-[90%] max-w-7xl py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Our Story
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          We believe the Nordic region holds some of the world&apos;s most breathtaking experiences. 
          Our mission is to connect travelers with authentic adventures across Scandinavia.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-20 grid items-center gap-12 lg:grid-cols-2">
        <div className="relative h-[400px] overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1520769945061-0a448c463865"
            alt="Northern Lights over Nordic landscape"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8DD3BB]">
            <Mountain className="h-7 w-7 text-secondary" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Born from a Love of the North
          </h2>
          <p className="mb-4 text-gray-600">
            NordExplore was founded by a team of passionate Nordic travelers who fell in love with 
            the region&apos;s stunning fjords, magical Northern Lights, and warm-hearted people. 
            We realized that while the Nordic countries offer incredible experiences, 
            finding and booking them shouldn&apos;t be complicated.
          </p>
          <p className="text-gray-600">
            Today, we curate the best tours and experiences from trusted local operators, 
            making it easy for travelers worldwide to discover the magic of Scandinavia.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          What We Stand For
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-[#CDEAE1] p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8DD3BB]">
              <Heart className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-secondary">Authenticity</h3>
            <p className="text-secondary/70">
              We partner only with local operators who share our passion for genuine Nordic experiences. 
              No tourist traps, just real adventures.
            </p>
          </div>

          <div className="rounded-2xl bg-[#CDEAE1] p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8DD3BB]">
              <Globe className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-secondary">Sustainability</h3>
            <p className="text-secondary/70">
              The Nordic wilderness is precious. We promote responsible tourism and partner with 
              eco-conscious operators who protect these landscapes.
            </p>
          </div>

          <div className="rounded-2xl bg-[#CDEAE1] p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8DD3BB]">
              <Users className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-secondary">Community</h3>
            <p className="text-secondary/70">
              We support local guides, small businesses, and communities across all five 
              Nordic countries, ensuring tourism benefits everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="mb-20">
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">
          Five Countries, Endless Adventures
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
          From Norway&apos;s dramatic fjords to Iceland&apos;s volcanic landscapes, Sweden&apos;s pristine forests 
          to Finland&apos;s magical Lapland, and Denmark&apos;s charming coastlines - we cover it all.
        </p>
        <div className="grid gap-4 md:grid-cols-5">
          {[
            { name: "Norway", highlight: "Fjords & Aurora" },
            { name: "Iceland", highlight: "Volcanoes & Glaciers" },
            { name: "Sweden", highlight: "Archipelago & Nature" },
            { name: "Finland", highlight: "Lapland & Saunas" },
            { name: "Denmark", highlight: "Castles & Coast" },
          ].map((country) => (
            <Link
              key={country.name}
              href={`/experiences?country=${country.name}`}
              className="group rounded-xl bg-gray-50 p-6 text-center transition-all hover:bg-[#CDEAE1] hover:shadow-md"
            >
              <h3 className="mb-1 text-lg font-bold text-gray-900 group-hover:text-secondary">
                {country.name}
              </h3>
              <p className="text-sm text-gray-500 group-hover:text-secondary/70">
                {country.highlight}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-20 rounded-2xl bg-secondary p-12 text-white">
        <div className="grid gap-8 text-center md:grid-cols-4">
          <div>
            <div className="mb-2 text-4xl font-bold">150+</div>
            <div className="text-white/80">Curated Experiences</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold">5</div>
            <div className="text-white/80">Nordic Countries</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold">50+</div>
            <div className="text-white/80">Local Partners</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold">4.7★</div>
            <div className="text-white/80">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Why Travel With NordExplore
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex gap-4 rounded-xl bg-gray-50 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8DD3BB]">
              <Award className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h3 className="mb-2 font-bold text-gray-900">Verified Reviews</h3>
              <p className="text-gray-600">
                All experiences feature real reviews from travelers who&apos;ve been there. 
                No fake ratings, just honest feedback.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl bg-gray-50 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8DD3BB]">
              <Compass className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h3 className="mb-2 font-bold text-gray-900">Expert Curation</h3>
              <p className="text-gray-600">
                Our team personally vets every experience. We only feature tours that 
                meet our standards for quality and authenticity.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl bg-gray-50 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8DD3BB]">
              <Globe className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h3 className="mb-2 font-bold text-gray-900">Secure Booking</h3>
              <p className="text-gray-600">
                Book with confidence through our trusted partner Viator, with flexible 
                cancellation policies and secure payments.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-xl bg-gray-50 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8DD3BB]">
              <Heart className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h3 className="mb-2 font-bold text-gray-900">Local Expertise</h3>
              <p className="text-gray-600">
                Our partners are locals who know their regions inside out. Get insider 
                tips and hidden gems only locals know about.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-[#CDEAE1] p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-secondary">
          Ready to Explore the Nordics?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-secondary/70">
          Whether you&apos;re chasing the Northern Lights, hiking glaciers, or exploring Viking history, 
          your Nordic adventure starts here.
        </p>
        <Link
          href="/experiences"
          className="inline-block rounded-lg bg-secondary px-8 py-4 font-semibold text-white transition-colors hover:bg-secondary/90"
        >
          Browse All Experiences
        </Link>
      </section>
    </main>
  );
}
