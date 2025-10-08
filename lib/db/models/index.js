import { model, models } from "mongoose";

import {
  subscriptionSchema,
  userSchema,
  anonymousUserSchema,
  flightItinerarySchema,
  flightSegmentSchema,
  flightSeatsSchema,
  accountsSchema,
  airlineSchema,
  airlineFlightPricesSchema,
  airportSchema,
  flightBookingSchema,
  flightReviewSchema,
  flightPaymentSchema,
  hotelBookingSchema,
  hotelRoomSchema,
  hotelGuestSchema,
  hotelSchema,
  hotelReviewSchema,
  hotelPaymentSchema,
  passengerSchema,
  verificationTokenSchema,
  sessionSchema,
  seatSchema,
  airplaneSchema,
  promoCodeSchema,
  searchHistorySchema,
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
  FlightItinerary:
    models?.FlightItinerary || model("FlightItinerary", flightItinerarySchema),
  FlightSegment:
    models?.FlightSegment || model("FlightSegment", flightSegmentSchema),
  FlightSeat: models?.FlightSeat || model("FlightSeat", flightSeatsSchema),
  Account: models?.Account || model("Account", accountsSchema),
  Airline: models?.Airline || model("Airline", airlineSchema),
  AirlineFlightPrice:
    models?.AirlineFlightPrice ||
    model("AirlineFlightPrice", airlineFlightPricesSchema),
  Airport: models?.Airport || model("Airport", airportSchema),
  FlightBooking:
    models?.FlightBooking || model("FlightBooking", flightBookingSchema),
  FlightReview:
    models?.FlightReview || model("FlightReview", flightReviewSchema),
  FlightPayment:
    models?.FlightPayment || model("FlightPayment", flightPaymentSchema),
  HotelBooking:
    models?.HotelBooking || model("HotelBooking", hotelBookingSchema),
  HotelRoom: models?.HotelRoom || model("HotelRoom", hotelRoomSchema),
  HotelGuest: models?.HotelGuest || model("HotelGuest", hotelGuestSchema),
  Hotel: models?.Hotel || model("Hotel", hotelSchema),
  HotelPayment:
    models?.HotelPayment || model("HotelPayment", hotelPaymentSchema),
  Passenger: models?.Passenger || model("Passenger", passengerSchema),
  HotelReview: models?.HotelReview || model("HotelReview", hotelReviewSchema),
  Verification_Token:
    models?.Verification_Token ||
    model("Verification_Token", verificationTokenSchema),
  Session: models?.Session || model("Session", sessionSchema),
  Seat: models?.Seat || model("Seat", seatSchema),
  Airplane: models?.Airplane || model("Airplane", airplaneSchema),
  PromoCode: models?.PromoCode || model("PromoCode", promoCodeSchema),
  SearchHistory:
    models?.SearchHistory || model("SearchHistory", searchHistorySchema),
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
  FlightItinerary,
  FlightSegment,
  FlightSeat,
  Account,
  Airline,
  AirlineFlightPrice,
  Airport,
  FlightBooking,
  FlightPayment,
  HotelBooking,
  HotelRoom,
  HotelGuest,
  Hotel,
  HotelPayment,
  Passenger,
  FlightReview,
  HotelReview,
  Verification_Token,
  Session,
  Seat,
  Airplane,
  PromoCode,
  SearchHistory,
  WebsiteReview,
  WebsiteConfig,
  Analytic,
  Experience,
  ExperienceReview,
} = dataModels;

export default dataModels;
