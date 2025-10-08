import { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const emailSchema = new Schema({
  _id: false,
  email: { type: String, required: true, unique: true },
  emailVerifiedAt: { type: Date, required: false, default: null },
  primary: { type: Boolean, default: false },
  inVerification: { type: Boolean, default: false },
});
const phoneSchema = new Schema({
  _id: false,
  number: { type: String, required: true },
  dialCode: { type: String, required: true },
  inVerification: { type: Boolean, default: false },
  verifiedAt: { type: Date, default: null },
  primary: { type: Boolean, default: false },
});

export const rewardPoints = new Schema({
  totalPoints: { type: Number, default: 0 },
  pointHistory: [
    {
      type: { type: String, enum: ["earned", "redeemed"], required: true },
      amount: { type: Number, required: true },
      source: { type: String, enum: ["flightBooking", "hotelBooking"] },
      referenceId: { type: Schema.Types.ObjectId }, // booking id
      date: { type: Date, default: Date.now },
    },
  ],
});

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emails: [emailSchema],
    profileImage: { type: String, required: true },
    coverImage: { type: String, required: false },
    emailVerifiedAt: { type: Date, required: false, default: null },
    phoneNumbers: [phoneSchema],
    address: {
      type: String,
      default: null,
    },
    dateOfBirth: { type: Date, default: null },
    customerId: { type: String, default: null }, // stripe customer id
    rewardPoints: rewardPoints,
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(mongooseAutoPopulate);
export default userSchema;
