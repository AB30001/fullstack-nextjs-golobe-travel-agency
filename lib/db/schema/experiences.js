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
    
    // What's included/excluded (from Viator API)
    inclusions: [{
      category: String,
      categoryDescription: String,
      type: String,
      typeDescription: String,
      description: String
    }],
    exclusions: [{
      category: String,
      categoryDescription: String,
      type: String,
      typeDescription: String,
      description: String
    }],
    
    // Legacy simple arrays (kept for backward compatibility)
    included: [{ type: String }],
    notIncluded: [{ type: String }],
    
    // Itinerary (detailed tour stops and route)
    itinerary: {
      itineraryType: String, // STANDARD, STRUCTURED, UNSTRUCTURED
      skipTheLine: Boolean,
      privateTour: Boolean,
      duration: {
        fixedDurationInMinutes: Number,
        variableDurationFromMinutes: Number,
        variableDurationToMinutes: Number
      },
      itineraryItems: [{
        pointOfInterestName: String,
        attractionId: Number,
        duration: {
          fixedDurationInMinutes: Number
        },
        passByWithoutStopping: Boolean,
        admissionIncluded: String, // YES, NO, NOT_APPLICABLE
        description: String
      }]
    },
    
    // Meeting point and logistics
    meetingPoint: { 
      address: String,
      description: String,
      coordinates: {
        lat: Number,
        lon: Number
      }
    },
    endPoint: {
      address: String,
      description: String,
      coordinates: {
        lat: Number,
        lon: Number
      }
    },
    travelerPickup: {
      pickupOptionType: String,
      allowCustomTravelerPickup: Boolean,
      minutesBeforeDepartureTimeForPickup: Number,
      additionalInfo: String
    },
    
    // Cancellation policy
    cancellationPolicy: {
      type: String, // STANDARD, ALL_SALES_FINAL, etc.
      description: String,
      cancelIfBadWeather: Boolean,
      cancelIfInsufficientTravelers: Boolean,
      refundEligibility: [{
        dayRangeMin: Number,
        dayRangeMax: Number,
        percentageRefundable: Number
      }]
    },
    
    // Additional information
    additionalInfo: [{
      type: String,
      description: String
    }],
    
    // Languages offered
    languagesOffered: [{ type: String }],
    languageGuides: [{
      type: String, // GUIDE, AUDIO_GUIDE, WRITTEN
      language: String, // en, es, fr, etc.
      legacyGuide: String
    }],
    
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
