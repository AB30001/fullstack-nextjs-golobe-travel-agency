import { Schema } from "mongoose";

const experienceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    
    // Nordic country location
    country: {
      type: String,
      enum: ["Norway", "Iceland", "Sweden", "Finland", "Denmark"],
      required: true,
    },
    city: { type: String, required: true },
    region: { type: String },
    
    // Categorization
    category: {
      type: String,
      enum: [
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
        "Historical Sites",
        "Multi-day Tours"
      ],
      required: true,
    },
    tags: [{ type: String }],
    
    // Experience details
    duration: {
      value: { type: Number, required: true },
      unit: {
        type: String,
        enum: ["hours", "days"],
        required: true,
      },
    },
    
    // Pricing (for display only, not for booking)
    priceRange: {
      type: String,
      enum: ["$", "$$", "$$$", "$$$$"],
      required: true,
    },
    priceFrom: { type: Number, required: true }, // Starting price in USD
    
    // Images
    images: [{ type: String, required: true }],
    coverImage: { type: String, required: true },
    
    // Affiliate information
    affiliateLink: { type: String, required: true },
    affiliatePartner: { type: String, required: true }, // e.g., "GetYourGuide", "Viator", "Klook"
    
    // Additional info
    highlights: [{ type: String }],
    included: [{ type: String }],
    notIncluded: [{ type: String }],
    meetingPoint: { type: String },
    languagesOffered: [{ type: String }],
    
    // Ratings & reviews
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    
    // Availability
    isActive: { type: Boolean, default: true },
    seasonalAvailability: {
      availableMonths: [{ type: Number, min: 1, max: 12 }], // [1,2,3...12]
    },
    
    // Coordinates for map display
    coordinates: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// Index for search performance
experienceSchema.index({ country: 1, category: 1 });
experienceSchema.index({ averageRating: -1 });

export default experienceSchema;
