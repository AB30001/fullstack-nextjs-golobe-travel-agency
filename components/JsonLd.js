export function WebsiteJsonLd() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://nordexplore.com";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NordExplore",
    alternateName: "Nordic Experiences",
    url: BASE_URL,
    description: "Discover amazing tours and experiences across Norway, Iceland, Sweden, Finland, and Denmark. Find Northern Lights tours, fjord cruises, wildlife safaris, and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/experiences?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://nordexplore.com";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NordExplore",
    url: BASE_URL,
    logo: `${BASE_URL}/images/nordexplore-logo.svg`,
    description: "Your gateway to authentic Nordic adventures across Scandinavia",
    areaServed: [
      { "@type": "Country", name: "Norway" },
      { "@type": "Country", name: "Iceland" },
      { "@type": "Country", name: "Sweden" },
      { "@type": "Country", name: "Finland" },
      { "@type": "Country", name: "Denmark" },
    ],
    sameAs: [
      "https://www.facebook.com",
      "https://www.twitter.com",
      "https://www.instagram.com",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function TourJsonLd({ experience }) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://nordexplore.com";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: experience.title,
    description: experience.description,
    url: `${BASE_URL}/experiences/${experience.slug}`,
    image: experience.coverImage || experience.images?.[0],
    touristType: "Adventure traveler",
    provider: {
      "@type": "Organization",
      name: experience.affiliatePartner || "NordExplore",
    },
    offers: {
      "@type": "Offer",
      price: experience.priceFrom,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: experience.affiliateLink,
    },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: experience.highlights?.length || 0,
      itemListElement: experience.highlights?.map((highlight, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: highlight,
      })) || [],
    },
    ...(experience.averageRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: experience.averageRating,
        reviewCount: experience.totalReviews || 1,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
