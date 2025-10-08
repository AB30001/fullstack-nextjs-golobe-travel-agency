import { Schema } from "mongoose";

const anonymousUserSchema = new Schema(
  {
    sessionId: { type: String, unique: true, required: true },
    expireAt: {
      type: Date,
      expires: 0,
      default: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

export default anonymousUserSchema;
