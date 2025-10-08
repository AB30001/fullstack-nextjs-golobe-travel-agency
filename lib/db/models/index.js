import { model, models } from "mongoose";

import {
  subscriptionSchema,
  userSchema,
  anonymousUserSchema,
  accountsSchema,
  verificationTokenSchema,
  sessionSchema,
  websiteReviewSchema,
  websiteConfigSchema,
  analyticsSchema,
  experienceSchema,
  experienceReviewSchema,
} from "../schema";

const dataModels = {
  Subscription:
    models?.Subscription || model("Subscription", subscriptionSchema),
  User: models?.User || model("User", userSchema),
  AnonymousUser:
    models?.AnonymousUser || model("AnonymousUser", anonymousUserSchema),
  Account: models?.Account || model("Account", accountsSchema),
  Verification_Token:
    models?.Verification_Token ||
    model("Verification_Token", verificationTokenSchema),
  Session: models?.Session || model("Session", sessionSchema),
  WebsiteReview:
    models?.WebsiteReview || model("WebsiteReview", websiteReviewSchema),
  WebsiteConfig:
    models?.WebsiteConfig || model("WebsiteConfig", websiteConfigSchema),
  Analytic: models?.Analytic || model("Analytic", analyticsSchema),
  Experience: models?.Experience || model("Experience", experienceSchema),
  ExperienceReview:
    models?.ExperienceReview || model("ExperienceReview", experienceReviewSchema),
};

export const {
  Subscription,
  User,
  AnonymousUser,
  Account,
  Verification_Token,
  Session,
  WebsiteReview,
  WebsiteConfig,
  Analytic,
  Experience,
  ExperienceReview,
} = dataModels;

export default dataModels;
