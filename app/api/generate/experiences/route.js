import { NextResponse } from "next/server";
import { Experience } from "@/lib/db/models";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    // Simple auth check
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.API_SECRET_TOKEN}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // Clear existing experiences
    await Experience.deleteMany({});

    const sampleExperiences = [
      // Norway
      {
        slug: "northern-lights-tromso",
        title: "Northern Lights Safari in Tromsø",
        description:
          "Chase the magical Northern Lights with expert guides in the Arctic wilderness of Tromsø.",
        longDescription:
          "Join us for an unforgettable Northern Lights hunting experience. Our experienced guides know the best spots and weather patterns to maximize your chances of seeing this natural phenomenon.",
        country: "Norway",
        city: "Tromsø",
        category: "Northern Lights",
        tags: ["Northern Lights", "Photography", "Winter", "Arctic"],
        duration: { value: 6, unit: "hours" },
        priceRange: "$$",
        priceFrom: 120,
        images: [
          "https://images.unsplash.com/photo-1483347756197-71ef80e95f73",
          "https://images.unsplash.com/photo-1579033461380-adb47c3eb938",
        ],
        coverImage: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73",
        affiliateLink: "https://www.getyourguide.com",
        affiliatePartner: "GetYourGuide",
        highlights: [
          "Expert local guides",
          "Hot drinks and snacks included",
          "Small group experience",
          "Professional photography tips",
        ],
        included: ["Transportation", "Guide", "Hot beverages", "Winter clothing"],
        meetingPoint: "Tromsø city center",
        languagesOffered: ["English", "Norwegian"],
        averageRating: 4.8,
        totalReviews: 234,
        coordinates: { lat: 69.6492, lon: 18.9553 },
        seasonalAvailability: { availableMonths: [9, 10, 11, 12, 1, 2, 3] },
      },
      {
        slug: "geirangerfjord-cruise",
        title: "Geirangerfjord Scenic Cruise",
        description:
          "Experience one of the world's most beautiful fjords on a scenic cruise through Geirangerfjord.",
        longDescription:
          "Sail through the stunning Geirangerfjord, a UNESCO World Heritage site. Marvel at waterfalls, snow-capped peaks, and abandoned farms on the steep mountainsides.",
        country: "Norway",
        city: "Geiranger",
        region: "Sunnmøre",
        category: "Fjord Tours",
        tags: ["Fjords", "Boat Tour", "UNESCO", "Scenic"],
        duration: { value: 2, unit: "hours" },
        priceRange: "$",
        priceFrom: 45,
        images: [
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
          "https://images.unsplash.com/photo-1531219432768-9f540ce91ef3",
        ],
        coverImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
        affiliateLink: "https://www.viator.com",
        affiliatePartner: "Viator",
        highlights: [
          "UNESCO World Heritage fjord",
          "Seven Sisters waterfall",
          "Breathtaking mountain views",
          "Photo opportunities",
        ],
        included: ["Boat cruise", "Audio guide"],
        meetingPoint: "Geiranger pier",
        languagesOffered: ["English", "Norwegian", "German"],
        averageRating: 4.9,
        totalReviews: 456,
        coordinates: { lat: 62.1009, lon: 7.2061 },
        seasonalAvailability: { availableMonths: [5, 6, 7, 8, 9] },
      },

      // Iceland
      {
        slug: "golden-circle-tour",
        title: "Golden Circle Classic Tour",
        description:
          "Visit Iceland's three most famous attractions: Þingvellir, Geysir, and Gullfoss in one day.",
        longDescription:
          "Explore the Golden Circle, Iceland's most popular tourist route. See the historic Þingvellir National Park, the powerful Gullfoss waterfall, and the geothermal area with the Strokkur geyser.",
        country: "Iceland",
        city: "Reykjavik",
        category: "Cultural Tours",
        tags: ["Golden Circle", "Geysir", "Waterfall", "National Park"],
        duration: { value: 8, unit: "hours" },
        priceRange: "$$",
        priceFrom: 85,
        images: [
          "https://images.unsplash.com/photo-1504829857797-ddff29c27927",
          "https://images.unsplash.com/photo-1505832018823-50331d70d237",
        ],
        coverImage: "https://images.unsplash.com/photo-1504829857797-ddff29c27927",
        affiliateLink: "https://www.getyourguide.com",
        affiliatePartner: "GetYourGuide",
        highlights: [
          "Þingvellir National Park",
          "Strokkur geyser eruption",
          "Gullfoss waterfall",
          "Kerið volcanic crater",
        ],
        included: ["Bus transportation", "Guide", "Hotel pickup"],
        meetingPoint: "Central Reykjavik pickup",
        languagesOffered: ["English", "Icelandic"],
        averageRating: 4.7,
        totalReviews: 892,
        coordinates: { lat: 64.1466, lon: -21.9426 },
        seasonalAvailability: { availableMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      },
      {
        slug: "glacier-hiking-iceland",
        title: "Glacier Hiking Adventure on Vatnajökull",
        description:
          "Hike on Europe's largest glacier with experienced guides and explore ice formations.",
        longDescription:
          "Experience the thrill of walking on a real glacier. Our certified guides will lead you safely across the ice, teaching you about glaciology and showing you stunning ice caves and crevasses.",
        country: "Iceland",
        city: "Skaftafell",
        category: "Hiking & Trekking",
        tags: ["Glacier", "Hiking", "Adventure", "Ice Cave"],
        duration: { value: 4, unit: "hours" },
        priceRange: "$$$",
        priceFrom: 150,
        images: [
          "https://images.unsplash.com/photo-1531219432768-9f540ce91ef3",
          "https://images.unsplash.com/photo-1483354483454-4cd359948304",
        ],
        coverImage: "https://images.unsplash.com/photo-1531219432768-9f540ce91ef3",
        affiliateLink: "https://www.viator.com",
        affiliatePartner: "Viator",
        highlights: [
          "Walk on Vatnajökull glacier",
          "See stunning ice formations",
          "Learn from certified glacier guides",
          "All equipment provided",
        ],
        included: ["Glacier equipment", "Safety gear", "Expert guide"],
        meetingPoint: "Skaftafell Visitor Center",
        languagesOffered: ["English"],
        averageRating: 4.9,
        totalReviews: 567,
        coordinates: { lat: 64.0166, lon: -16.9737 },
        seasonalAvailability: { availableMonths: [5, 6, 7, 8, 9] },
      },

      // Sweden
      {
        slug: "stockholm-archipelago-kayak",
        title: "Stockholm Archipelago Kayaking Tour",
        description:
          "Paddle through the beautiful Stockholm archipelago and discover hidden islands and coves.",
        longDescription:
          "Explore the stunning Stockholm archipelago by kayak. Paddle past thousands of islands, enjoy swimming breaks, and experience the Swedish nature at its finest.",
        country: "Sweden",
        city: "Stockholm",
        category: "Boat Tours",
        tags: ["Kayaking", "Archipelago", "Nature", "Water Sports"],
        duration: { value: 5, unit: "hours" },
        priceRange: "$$",
        priceFrom: 95,
        images: [
          "https://images.unsplash.com/photo-1509356843151-3e7d96241e11",
          "https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93",
        ],
        coverImage: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11",
        affiliateLink: "https://www.getyourguide.com",
        affiliatePartner: "GetYourGuide",
        highlights: [
          "Paddle through 30,000 islands",
          "Swimming opportunities",
          "Picnic lunch included",
          "Suitable for beginners",
        ],
        included: ["Kayak rental", "Guide", "Lunch", "Safety equipment"],
        meetingPoint: "Vaxholm harbor",
        languagesOffered: ["English", "Swedish"],
        averageRating: 4.6,
        totalReviews: 178,
        coordinates: { lat: 59.4022, lon: 18.3539 },
        seasonalAvailability: { availableMonths: [5, 6, 7, 8, 9] },
      },
      {
        slug: "icehotel-visit-sweden",
        title: "Icehotel Visit & Northern Lights",
        description:
          "Visit the world-famous Icehotel and hunt for Northern Lights in Swedish Lapland.",
        longDescription:
          "Experience the magic of the Icehotel in Jukkasjärvi, entirely made of ice and snow. After the tour, embark on a Northern Lights hunt in the Arctic wilderness.",
        country: "Sweden",
        city: "Jukkasjärvi",
        region: "Lapland",
        category: "Northern Lights",
        tags: ["Icehotel", "Northern Lights", "Arctic", "Unique Experience"],
        duration: { value: 7, unit: "hours" },
        priceRange: "$$$",
        priceFrom: 175,
        images: [
          "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d",
          "https://images.unsplash.com/photo-1483347756197-71ef80e95f73",
        ],
        coverImage: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d",
        affiliateLink: "https://www.viator.com",
        affiliatePartner: "Viator",
        highlights: [
          "Tour the famous Icehotel",
          "Chase Northern Lights",
          "Visit ice sculptures",
          "Arctic dinner included",
        ],
        included: ["Icehotel entry", "Northern Lights tour", "Dinner", "Transport"],
        meetingPoint: "Kiruna city center",
        languagesOffered: ["English", "Swedish"],
        averageRating: 4.8,
        totalReviews: 203,
        coordinates: { lat: 67.8558, lon: 20.5967 },
        seasonalAvailability: { availableMonths: [12, 1, 2, 3] },
      },

      // Finland
      {
        slug: "santa-claus-village-rovaniemi",
        title: "Santa Claus Village & Reindeer Safari",
        description:
          "Meet Santa Claus in Lapland and enjoy a magical reindeer sleigh ride through snowy forests.",
        longDescription:
          "Visit the official home of Santa Claus in Rovaniemi. Cross the Arctic Circle, meet Santa, and experience a traditional reindeer safari through the winter wonderland of Lapland.",
        country: "Finland",
        city: "Rovaniemi",
        region: "Lapland",
        category: "Cultural Tours",
        tags: ["Santa Claus", "Reindeer", "Lapland", "Family"],
        duration: { value: 5, unit: "hours" },
        priceRange: "$$",
        priceFrom: 110,
        images: [
          "https://images.unsplash.com/photo-1517841905240-472988babdf9",
          "https://images.unsplash.com/photo-1544084256-7a1e57146c89",
        ],
        coverImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        affiliateLink: "https://www.getyourguide.com",
        affiliatePartner: "GetYourGuide",
        highlights: [
          "Meet Santa Claus personally",
          "Cross the Arctic Circle",
          "Reindeer sleigh ride",
          "Certificate from Santa",
        ],
        included: ["Santa visit", "Reindeer safari", "Hot drinks", "Transportation"],
        meetingPoint: "Rovaniemi city center",
        languagesOffered: ["English", "Finnish"],
        averageRating: 4.9,
        totalReviews: 421,
        coordinates: { lat: 66.5039, lon: 25.7294 },
        seasonalAvailability: { availableMonths: [11, 12, 1, 2, 3] },
      },
      {
        slug: "husky-sledding-finland",
        title: "Husky Sledding Adventure in Lapland",
        description:
          "Drive your own team of huskies through the pristine snowy landscapes of Finnish Lapland.",
        longDescription:
          "Experience the thrill of mushing your own husky team through the Arctic wilderness. Learn to drive a sled, meet the adorable huskies, and enjoy the peaceful beauty of Lapland's winter forests.",
        country: "Finland",
        city: "Saariselkä",
        region: "Lapland",
        category: "Adventure Sports",
        tags: ["Husky", "Dog Sledding", "Winter", "Adventure"],
        duration: { value: 4, unit: "hours" },
        priceRange: "$$$",
        priceFrom: 165,
        images: [
          "https://images.unsplash.com/photo-1544084256-7a1e57146c89",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        ],
        coverImage: "https://images.unsplash.com/photo-1544084256-7a1e57146c89",
        affiliateLink: "https://www.viator.com",
        affiliatePartner: "Viator",
        highlights: [
          "Drive your own husky team",
          "Meet friendly huskies",
          "Stunning winter scenery",
          "Warm lunch in wilderness",
        ],
        included: ["Husky sled ride", "Guide", "Winter clothing", "Lunch"],
        meetingPoint: "Husky farm Saariselkä",
        languagesOffered: ["English", "Finnish"],
        averageRating: 4.9,
        totalReviews: 312,
        coordinates: { lat: 68.4132, lon: 27.5653 },
        seasonalAvailability: { availableMonths: [12, 1, 2, 3, 4] },
      },

      // Denmark
      {
        slug: "copenhagen-bike-tour",
        title: "Copenhagen Highlights Bike Tour",
        description:
          "Explore Copenhagen like a local on a guided bike tour through the city's best sights.",
        longDescription:
          "Join us for a classic Copenhagen experience - cycling through the city! Visit famous landmarks, hidden gems, and learn about Danish culture and history from your local guide.",
        country: "Denmark",
        city: "Copenhagen",
        category: "City Tours",
        tags: ["Cycling", "City Tour", "Culture", "Sightseeing"],
        duration: { value: 3, unit: "hours" },
        priceRange: "$",
        priceFrom: 40,
        images: [
          "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc",
          "https://images.unsplash.com/photo-1565793298595-6a879b1d9492",
        ],
        coverImage: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc",
        affiliateLink: "https://www.getyourguide.com",
        affiliatePartner: "GetYourGuide",
        highlights: [
          "Bike like a local",
          "See Nyhavn and Little Mermaid",
          "Visit Christiania",
          "Learn Danish culture",
        ],
        included: ["Bike rental", "Guide", "Helmet"],
        meetingPoint: "Central Copenhagen",
        languagesOffered: ["English", "Danish"],
        averageRating: 4.7,
        totalReviews: 634,
        coordinates: { lat: 55.6761, lon: 12.5683 },
        seasonalAvailability: { availableMonths: [4, 5, 6, 7, 8, 9, 10] },
      },
      {
        slug: "kronborg-castle-tour",
        title: "Hamlet's Kronborg Castle Tour",
        description:
          "Visit the legendary Kronborg Castle, the setting of Shakespeare's Hamlet, a UNESCO World Heritage site.",
        longDescription:
          "Explore Kronborg Castle in Helsingør, known worldwide as the setting for Shakespeare's Hamlet. This Renaissance castle offers stunning architecture, royal apartments, and fascinating history.",
        country: "Denmark",
        city: "Helsingør",
        category: "Historical Sites",
        tags: ["Castle", "History", "UNESCO", "Shakespeare"],
        duration: { value: 2, unit: "hours" },
        priceRange: "$",
        priceFrom: 35,
        images: [
          "https://images.unsplash.com/photo-1572720350370-8080d61fcdbe",
          "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2",
        ],
        coverImage: "https://images.unsplash.com/photo-1572720350370-8080d61fcdbe",
        affiliateLink: "https://www.viator.com",
        affiliatePartner: "Viator",
        highlights: [
          "UNESCO World Heritage castle",
          "Shakespeare's Hamlet setting",
          "Royal apartments tour",
          "Stunning sea views",
        ],
        included: ["Castle entry", "Audio guide"],
        meetingPoint: "Kronborg Castle entrance",
        languagesOffered: ["English", "Danish", "German"],
        averageRating: 4.6,
        totalReviews: 287,
        coordinates: { lat: 56.0394, lon: 12.6219 },
        seasonalAvailability: { availableMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      },
    ];

    const insertedExperiences = await Experience.insertMany(sampleExperiences);

    return NextResponse.json({
      success: true,
      message: `Successfully generated ${insertedExperiences.length} sample experiences`,
      count: insertedExperiences.length,
    });
  } catch (error) {
    console.error("Error generating experiences:", error);
    return NextResponse.json(
      { error: "Failed to generate experiences", details: error.message },
      { status: 500 }
    );
  }
}
