import { Schema } from "mongoose";

const experienceReviewSchema = new Schema(
  {
    experienceId: { 
      type: Schema.Types.ObjectId, 
      ref: "Experience",
      required: true,
    },
    
    // Reviewer info (no user accounts, so store directly)
    reviewerName: { type: String, required: true },
    reviewerCountry: { type: String },
    reviewerAvatar: { type: String }, // Optional avatar URL
    
    // Review content
    rating: { 
      type: Number, 
      required: true,
      min: 1,
      max: 5,
    },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    
    // Detailed ratings
    ratings: {
      valueForMoney: { type: Number, min: 1, max: 5 },
      safety: { type: Number, min: 1, max: 5 },
      service: { type: Number, min: 1, max: 5 },
      organization: { type: Number, min: 1, max: 5 },
    },
    
    // Review metadata
    travelDate: { type: Date }, // When they took the tour
    travelType: {
      type: String,
      enum: ["Solo", "Couple", "Family", "Friends", "Business"],
    },
    
    // Photos uploaded by reviewer
    photos: [{ type: String }],
    
    // Verification
    verified: { type: Boolean, default: false },
    
    // Helpful votes (no user accounts, use session/IP tracking)
    helpfulCount: { type: Number, default: 0 },
    
    // Moderation
    isVisible: { type: Boolean, default: true },
    flaggedCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Indexes
experienceReviewSchema.index({ experienceId: 1, createdAt: -1 });
experienceReviewSchema.index({ rating: -1 });

export default experienceReviewSchema;
