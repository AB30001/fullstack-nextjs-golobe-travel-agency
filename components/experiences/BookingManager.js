"use client";

import { useState } from "react";
import { BookingSidebar } from "./BookingSidebar";
import { StickyMobileBar } from "./StickyMobileBar";

export function BookingManager({ experience }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [canBook, setCanBook] = useState(false);

  const buildCheckoutUrl = () => {
    const baseUrl = experience.affiliateLink;
    const separator = baseUrl.includes('?') ? '&' : '?';
    
    const params = [];
    if (selectedDate) {
      params.push(`startDate=${selectedDate}`);
    }
    if (travelers) {
      params.push(`adults=${travelers}`);
    }
    
    return params.length > 0 
      ? `${baseUrl}${separator}${params.join('&')}`
      : baseUrl;
  };

  return (
    <>
      <BookingSidebar 
        experience={experience}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        travelers={travelers}
        setTravelers={setTravelers}
        buildCheckoutUrl={buildCheckoutUrl}
        canBook={canBook}
        setCanBook={setCanBook}
      />
      <StickyMobileBar 
        price={experience.priceFrom}
        buildCheckoutUrl={buildCheckoutUrl}
        canBook={canBook}
      />
    </>
  );
}
