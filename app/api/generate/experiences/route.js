import { Experience } from "@/lib/db/models";
import { connectToDB } from "@/lib/db/utilsDB";

// Helper function to generate multiple experiences
function generateNordicExperiences() {
  const categories = [
    "Northern Lights", "Fjord Tours", "Wildlife Safari", "Hiking & Trekking",
    "Winter Sports", "Cultural Tours", "Food & Drink", "Boat Tours",
    "City Tours", "Adventure Sports", "Nature & Wildlife", "Photography Tours",
    "Historical Sites", "Multi-day Tours"
  ];

  const countries = [
    { name: "Norway", cities: ["Oslo", "Bergen", "Tromsø", "Trondheim", "Stavanger", "Ålesund", "Bodø", "Lofoten"], 
      tags: ["Fjord", "Northern Lights", "Sami", "Viking"],
      lat: 61, lon: 8 },
    { name: "Iceland", cities: ["Reykjavík", "Akureyri", "Vík", "Husavik", "Ísafjörður", "Seyðisfjörður", "Höfn"],
      tags: ["Geothermal", "Volcano", "Glacier", "Hot Spring"],
      lat: 64.5, lon: -19 },
    { name: "Sweden", cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Kiruna", "Abisko", "Visby", "Jukkasjärvi"],
      tags: ["Archipelago", "Ice Hotel", "Midnight Sun", "Design"],
      lat: 60, lon: 18 },
    { name: "Finland", cities: ["Helsinki", "Tampere", "Rovaniemi", "Turku", "Lahti", "Kuusamo", "Kemi", "Oulu"],
      tags: ["Lapland", "Santa", "Sauna", "Ice Hotel"],
      lat: 61, lon: 25 },
    { name: "Denmark", cities: ["Copenhagen", "Århus", "Odense", "Aalborg", "Roskilde", "Helsingør", "Skagen"],
      tags: ["Hygge", "Design", "Cycling", "Vikings"],
      lat: 56, lon: 10 }
  ];

  const priceRanges = ["$", "$$", "$$$"];
  const durations = [
    { value: 2, unit: "hours" }, { value: 3, unit: "hours" },
    { value: 4, unit: "hours" }, { value: 5, unit: "hours" },
    { value: 6, unit: "hours" }, { value: 8, unit: "hours" },
    { value: 1, unit: "days" }, { value: 2, unit: "days" },
    { value: 3, unit: "days" }
  ];

  const allExperiences = [];
  let id = 1;

  countries.forEach(country => {
    // 30 experiences per country
    for (let i = 0; i < 30; i++) {
      const city = country.cities[i % country.cities.length];
      const category = categories[i % categories.length];
      const priceRange = priceRanges[i % priceRanges.length];
      const duration = durations[i % durations.length];
      
      // Generate realistic pricing based on category and duration
      let priceFrom = 45;
      if (priceRange === "$$") priceFrom = 70 + Math.random() * 30;
      else if (priceRange === "$$$") priceFrom = 120 + Math.random() * 80;
      
      if (duration.unit === "days") priceFrom *= (duration.value * 50);

      const experience = {
        slug: `${slugify(category)}-${slugify(city)}-${i + 1}`,
        title: `${generateTourTitle(category, city, i)}`,
        description: `Experience ${category.toLowerCase()} in beautiful ${city}, ${country.name}`,
        longDescription: generateLongDescription(category, city, country.name, duration),
        country: country.name,
        city: city,
        region: country.name === "Norway" ? "Vestland" : country.name === "Sweden" ? "Stockholm County" : country.name,
        category: category,
        tags: [category, country.tags[0], country.tags[1], city, country.name],
        duration: duration,
        priceRange: priceRange,
        priceFrom: Math.round(priceFrom),
        images: generateImages(category),
        coverImage: generateImages(category)[0],
        affiliateLink: `https://www.viator.com/${category.toLowerCase().replace(/\s+/g, "-")}-${city.toLowerCase()}`,
        affiliatePartner: "Viator",
        highlights: generateHighlights(category, city),
        included: generateIncluded(category),
        notIncluded: ["Gratuities", "Personal expenses"],
        averageRating: 4.0 + Math.random() * 0.9,
        totalReviews: Math.floor(Math.random() * 500 + 50),
        isActive: true,
        coordinates: {
          lat: country.lat + (Math.random() * 4 - 2),
          lon: country.lon + (Math.random() * 4 - 2)
        }
      };

      allExperiences.push(experience);
    }
  });

  return allExperiences;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ø/g, "o")
    .replace(/æ/g, "ae")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateTourTitle(category, city, index) {
  const prefixes = [
    "Amazing", "Unforgettable", "Private", "Premium", "Small-Group",
    "Full-Day", "Half-Day", "Guided", "Exclusive", "Scenic"
  ];
  const suffixes = [
    "Experience", "Tour", "Adventure", "Journey", "Discovery",
    "Expedition", "Exploration", "Excursion", "Trip"
  ];

  const prefix = prefixes[index % prefixes.length];
  const suffix = suffixes[index % suffixes.length];
  
  return `${prefix} ${category} ${suffix} in ${city}`;
}

function generateLongDescription(category, city, country, duration) {
  const templates = [
    `Discover ${city}, one of ${country}'s most enchanting destinations. This ${duration.value}-${duration.unit} ${category.toLowerCase()} takes you through stunning landscapes, rich culture, and unforgettable experiences.`,
    `Experience the best of ${country} on this guided ${category.toLowerCase()} tour. From historic sites to natural wonders, this is your chance to see ${city} from a unique perspective.`,
    `Join us for an authentic ${category.toLowerCase()} experience in ${city}. Our expert guides will take you on a journey through ${country}'s most beautiful destinations with insider knowledge and local stories.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateImages(category) {
  const baseImages = {
    "Northern Lights": [
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800",
      "https://images.unsplash.com/photo-1520637836862-4d197d17cae0?w=800",
      "https://images.unsplash.com/photo-1506377247756-7de8b5e8ea1e?w=800"
    ],
    "Fjord Tours": [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1513427123250-696b5e57d207?w=800"
    ],
    "Wildlife Safari": [
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
      "https://images.unsplash.com/photo-1574958265740-018c7c7e1c97?w=800"
    ],
    "Food & Drink": [
      "https://images.unsplash.com/photo-1541220863199-6e8adb1eb7a1?w=800",
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
    ],
    "Boat Tours": [
      "https://images.unsplash.com/photo-1533924264833-0a81673c24e1?w=800",
      "https://images.unsplash.com/photo-1597125735007-1d30566b4e82?w=800",
      "https://images.unsplash.com/photo-1565300172585-18c1e4c2b3ef?w=800"
    ],
    "Cultural Tours": [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800",
      "https://images.unsplash.com/photo-1533924264833-0a81673c24e1?w=800"
    ],
    "Nature & Wildlife": [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"
    ],
    "Hiking & Trekking": [
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800",
      "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800"
    ],
    "Winter Sports": [
      "https://images.unsplash.com/photo-1535052490338-c63e74574394?w=800",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800",
      "https://images.unsplash.com/photo-1522857138952-65eb6bc5c5e5?w=800"
    ],
    "City Tours": [
      "https://images.unsplash.com/photo-1533924264833-0a81673c24e1?w=800",
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800"
    ],
    "Adventure Sports": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800",
      "https://images.unsplash.com/photo-1509316975852-a0e017a9823f?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
    ],
    "Photography Tours": [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
      "https://images.unsplash.com/photo-1516035069371-29a1b244b32a?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
    ],
    "Historical Sites": [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800",
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800"
    ],
    "Multi-day Tours": [
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800"
    ]
  };

  // Always return images, with fallback to scenic Nordic landscapes
  const images = baseImages[category] || [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800"
  ];

  return images;
}

function generateHighlights(category, city) {
  const commonHighlights = [
    `Explore ${city}'s most iconic sights`,
    "Professional local guide",
    "Small group experience",
    "Photo opportunities throughout"
  ];

  return [
    ...commonHighlights.slice(0, 2),
    `Unique ${category.toLowerCase()} experience`,
    "Flexible booking and cancellation options"
  ];
}

function generateIncluded(category) {
  const baseIncluded = ["Professional guide", "All admission fees"];
  const categorySpecific = {
    "Northern Lights": ["Warm clothing", "Hot drinks"],
    "Boat Tours": ["Boat trip", "Life jackets"],
    "Food & Drink": ["Food samples", "Local tastings"],
    "Hiking & Trekking": ["Hiking equipment", "Snacks"],
    "Wildlife Safari": ["Binoculars", "Wildlife spotting equipment"]
  };

  return [
    ...baseIncluded,
    ...(categorySpecific[category] || ["All equipment", "Coffee or tea"])
  ];
}

const uploadExperiencesToDB = async (maxExperiences = 150) => {
  await connectToDB();
  
  console.log("Generating Nordic experiences...");
  const allExperiences = generateNordicExperiences();
  const experiences = allExperiences.slice(0, maxExperiences);
  
  // Clear existing experiences
  await Experience.deleteMany({});
  
  // Insert experiences
  const results = await Experience.insertMany(experiences);
  
  console.log(`Successfully inserted ${results.length} experiences into database`);
  return results;
};

export async function POST(req) {
  if (
    req.headers.get("Authorization") !==
    `Bearer ${process.env.API_SECRET_TOKEN}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }
  
  try {
    const body = await req.json().catch(() => ({}));
    const maxExperiences = body.max || 150;
    
    console.log(`Uploading ${maxExperiences} experiences to database...`);
    const results = await uploadExperiencesToDB(maxExperiences);
    console.log("Experiences uploaded successfully");
    
    // Count by country
    const byCountry = results.reduce((acc, exp) => {
      acc[exp.country] = (acc[exp.country] || 0) + 1;
      return acc;
    }, {});
    
    return Response.json({
      success: true,
      message: "Experiences uploaded successfully",
      count: results.length,
      distribution: byCountry
    });
  } catch (error) {
    console.error("Error uploading experiences:", error);
    return Response.json(
      {
        success: false,
        message: "Error uploading experiences",
        error: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  if (
    req.headers.get("Authorization") !==
    `Bearer ${process.env.API_SECRET_TOKEN}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }
  
  return Response.json({
    message: "Use POST to upload mock experiences to database",
    endpoint: "POST /api/generate/experiences",
    body: { max: 150 } // to upload 150 experiences
  });
}
