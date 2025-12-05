"use client";

import { useState, useEffect, useCallback } from "react";
import { ExternalLink, Check, Shield, Calendar, Users, Loader2, AlertCircle, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { useCurrency } from "@/lib/contexts/CurrencyContext";
import { format, addDays, startOfDay } from "date-fns";

function getPricingLabel(experience) {
  if (experience.pricingType === 'UNIT') {
    if (experience.maxGroupSize) {
      return `per group (up to ${experience.maxGroupSize})`;
    }
    return 'per group';
  }
  return 'per adult';
}

function generateViatorCheckoutLink(affiliateLink, date, travelers) {
  if (!affiliateLink) return '#';
  
  const baseUrl = affiliateLink.includes('?') 
    ? affiliateLink 
    : affiliateLink;
  
  const params = new URLSearchParams();
  
  if (date) {
    params.append('date', format(date, 'yyyy-MM-dd'));
  }
  
  if (travelers.adults > 0) {
    params.append('adults', travelers.adults.toString());
  }
  if (travelers.children > 0) {
    params.append('children', travelers.children.toString());
  }
  if (travelers.infants > 0) {
    params.append('infants', travelers.infants.toString());
  }
  
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${params.toString()}`;
}

function DatePicker({ selectedDate, onDateChange, minDate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(minDate || new Date());
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }
  
  const isDateDisabled = (date) => {
    if (!date) return true;
    return startOfDay(date) < startOfDay(minDate);
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:border-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      >
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className={selectedDate ? "text-gray-900" : "text-gray-500"}>
            {selectedDate ? format(selectedDate, 'EEE, MMM d, yyyy') : 'Select date'}
          </span>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>
      
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              className="rounded p-1 hover:bg-gray-100"
              disabled={currentMonth <= minDate}
            >
              <ChevronUp className="h-5 w-5 rotate-[-90deg]" />
            </button>
            <span className="font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="rounded p-1 hover:bg-gray-100"
            >
              <ChevronUp className="h-5 w-5 rotate-90" />
            </button>
          </div>
          
          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isDateDisabled(date)}
                onClick={() => {
                  if (date && !isDateDisabled(date)) {
                    onDateChange(date);
                    setIsOpen(false);
                  }
                }}
                className={`rounded p-2 text-sm ${
                  !date
                    ? 'invisible'
                    : isDateDisabled(date)
                    ? 'cursor-not-allowed text-gray-300'
                    : selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                    ? 'bg-emerald-600 font-semibold text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {date?.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TravelerSelector({ travelers, onTravelersChange, pricingType, maxGroupSize }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const isUnitPricing = pricingType === 'UNIT';
  const maxTravelers = maxGroupSize || 15;
  
  const totalTravelers = travelers.adults + travelers.children + travelers.infants;
  
  const updateTraveler = (type, delta) => {
    const newValue = travelers[type] + delta;
    if (type === 'adults' && newValue < 1) return;
    if (newValue < 0) return;
    if (totalTravelers + delta > maxTravelers) return;
    
    onTravelersChange({ ...travelers, [type]: newValue });
  };
  
  const travelerText = isUnitPricing
    ? `${totalTravelers} traveler${totalTravelers !== 1 ? 's' : ''}`
    : `${travelers.adults} adult${travelers.adults !== 1 ? 's' : ''}${travelers.children > 0 ? `, ${travelers.children} child${travelers.children !== 1 ? 'ren' : ''}` : ''}${travelers.infants > 0 ? `, ${travelers.infants} infant${travelers.infants !== 1 ? 's' : ''}` : ''}`;
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left transition-colors hover:border-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      >
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-gray-400" />
          <span className="text-gray-900">{travelerText}</span>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>
      
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Adults</div>
                <div className="text-xs text-gray-500">Age 13+</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateTraveler('adults', -1)}
                  disabled={travelers.adults <= 1}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center font-medium">{travelers.adults}</span>
                <button
                  type="button"
                  onClick={() => updateTraveler('adults', 1)}
                  disabled={totalTravelers >= maxTravelers}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {!isUnitPricing && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Children</div>
                    <div className="text-xs text-gray-500">Age 3-12</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateTraveler('children', -1)}
                      disabled={travelers.children <= 0}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center font-medium">{travelers.children}</span>
                    <button
                      type="button"
                      onClick={() => updateTraveler('children', 1)}
                      disabled={totalTravelers >= maxTravelers}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Infants</div>
                    <div className="text-xs text-gray-500">Under 3</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateTraveler('infants', -1)}
                      disabled={travelers.infants <= 0}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center font-medium">{travelers.infants}</span>
                    <button
                      type="button"
                      onClick={() => updateTraveler('infants', 1)}
                      disabled={totalTravelers >= maxTravelers}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full rounded-lg bg-gray-900 py-2 text-sm font-medium text-white"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

export function BookingSidebar({ experience }) {
  const { formatPrice } = useCurrency();
  const pricingLabel = getPricingLabel(experience);
  
  const minDate = addDays(new Date(), 1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, infants: 0 });
  const [availability, setAvailability] = useState(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(null);
  
  const checkoutLink = generateViatorCheckoutLink(
    experience.affiliateLink, 
    selectedDate, 
    travelers
  );
  
  const checkAvailability = useCallback(async () => {
    if (!selectedDate || !experience.productCode) return;
    
    setIsCheckingAvailability(true);
    setAvailabilityError(null);
    setAvailability(null);
    
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const totalTravelers = travelers.adults + travelers.children + travelers.infants;
      const response = await fetch(
        `/api/viator/availability?productCode=${experience.productCode}&date=${dateStr}&travelers=${totalTravelers}`
      );
      const data = await response.json();
      
      if (data.success && data.availability) {
        setAvailability(data.availability);
      } else {
        setAvailabilityError('Unable to check availability');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailabilityError('Unable to check availability');
    } finally {
      setIsCheckingAvailability(false);
    }
  }, [selectedDate, travelers, experience.productCode]);
  
  useEffect(() => {
    if (selectedDate) {
      checkAvailability();
    }
  }, [selectedDate, checkAvailability]);
  
  return (
    <div className="sticky top-20 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
      <div className="mb-4">
        <div className="text-sm text-gray-600">From</div>
        <div className="text-3xl font-bold">{formatPrice(experience.priceFrom)}</div>
        <div className="text-sm text-gray-600">{pricingLabel}</div>
      </div>
      
      <div className="mb-4 space-y-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Select date
          </label>
          <DatePicker
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            minDate={minDate}
          />
        </div>
        
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Travelers
          </label>
          <TravelerSelector
            travelers={travelers}
            onTravelersChange={setTravelers}
            pricingType={experience.pricingType}
            maxGroupSize={experience.maxGroupSize}
          />
        </div>
      </div>
      
      {isCheckingAvailability && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          Checking availability...
        </div>
      )}
      
      {availabilityError && !isCheckingAvailability && selectedDate && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-gray-100 p-3 text-sm text-gray-600">
          <AlertCircle className="h-4 w-4" />
          Check availability on Viator
        </div>
      )}
      
      {availability && !isCheckingAvailability && selectedDate && !availabilityError && (
        <div className={`mb-4 flex items-center gap-2 rounded-lg p-3 text-sm ${
          availability.status === 'SOLD_OUT' || availability.status === 'UNAVAILABLE'
            ? 'bg-red-50 text-red-700'
            : availability.status === 'LIMITED'
            ? 'bg-amber-50 text-amber-700'
            : 'bg-green-50 text-green-700'
        }`}>
          {availability.status === 'SOLD_OUT' || availability.status === 'UNAVAILABLE' ? (
            <>
              <AlertCircle className="h-4 w-4" />
              {availability.status === 'UNAVAILABLE' ? 'Not available for this date' : 'Sold out for this date'}
            </>
          ) : availability.status === 'LIMITED' ? (
            <>
              <AlertCircle className="h-4 w-4" />
              Limited spots available
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Available for your date
            </>
          )}
        </div>
      )}

      <a
        href={checkoutLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white transition-colors"
        style={{ backgroundColor: '#186b6d' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#155a5c'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#186b6d'}
      >
        {selectedDate ? 'Check Availability & Book' : 'Select Date to Book'}
        <ExternalLink className="h-4 w-4" />
      </a>
      
      <div className="mb-1 text-center text-xs text-gray-500">
        You&apos;ll complete booking on Viator.com
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-green-700">
          <Check className="h-4 w-4" />
          <span className="font-medium">Free cancellation</span>
        </div>
        <div className="text-xs text-gray-600">
          Full refund if cancelled up to 24 hours before the experience starts (local time).
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-blue-700">
          <Shield className="h-4 w-4" />
          <span className="font-medium">Reserve now & pay later</span>
        </div>
        <div className="text-xs text-gray-600">
          Secure your spot while staying flexible.
        </div>
      </div>

      <div className="mb-4 rounded-lg bg-green-50 p-3 text-center">
        <div className="text-sm font-semibold text-green-800">
          Lowest price guarantee
        </div>
        <div className="text-xs text-green-700">
          Find a lower price online? Get the difference refunded!
        </div>
      </div>

      <div className="border-t pt-4 text-center text-xs text-gray-500">
        Powered by {experience.affiliatePartner}
      </div>
    </div>
  );
}
