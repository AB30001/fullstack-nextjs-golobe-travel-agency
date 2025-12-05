"use client";

import { useState, useEffect, useCallback } from "react";
import { ExternalLink, Heart, Calendar, Users, X, Minus, Plus, ChevronDown, ChevronUp, Loader2, Check, AlertCircle } from "lucide-react";
import { useCurrency } from "@/lib/contexts/CurrencyContext";
import { format, addDays, startOfDay } from "date-fns";

function getPricingLabel(pricingType, maxGroupSize) {
  if (pricingType === 'UNIT') {
    if (maxGroupSize) {
      return `per group (up to ${maxGroupSize})`;
    }
    return 'per group';
  }
  return 'per person';
}

function generateViatorCheckoutLink(affiliateLink) {
  if (!affiliateLink) return '#';
  return affiliateLink;
}

function MobileDatePicker({ selectedDate, onDateChange, minDate, onClose }) {
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
  
  return (
    <div className="fixed inset-0 z-[60] bg-black/50" onClick={onClose}>
      <div 
        className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white p-4 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select date</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
            className="rounded p-2 hover:bg-gray-100"
          >
            <ChevronUp className="h-5 w-5 rotate-[-90deg]" />
          </button>
          <span className="font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button
            type="button"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
            className="rounded p-2 hover:bg-gray-100"
          >
            <ChevronUp className="h-5 w-5 rotate-90" />
          </button>
        </div>
        
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500">
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
                  onClose();
                }
              }}
              className={`rounded-lg p-3 text-sm ${
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
    </div>
  );
}

function MobileTravelerPicker({ travelers, onTravelersChange, pricingType, maxGroupSize, onClose }) {
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
  
  return (
    <div className="fixed inset-0 z-[60] bg-black/50" onClick={onClose}>
      <div 
        className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white p-4 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Travelers</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Adults</div>
              <div className="text-sm text-gray-500">Age 13+</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => updateTraveler('adults', -1)}
                disabled={travelers.adults <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-8 text-center text-lg font-medium">{travelers.adults}</span>
              <button
                type="button"
                onClick={() => updateTraveler('adults', 1)}
                disabled={totalTravelers >= maxTravelers}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {!isUnitPricing && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Children</div>
                  <div className="text-sm text-gray-500">Age 3-12</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => updateTraveler('children', -1)}
                    disabled={travelers.children <= 0}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="w-8 text-center text-lg font-medium">{travelers.children}</span>
                  <button
                    type="button"
                    onClick={() => updateTraveler('children', 1)}
                    disabled={totalTravelers >= maxTravelers}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Infants</div>
                  <div className="text-sm text-gray-500">Under 3</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => updateTraveler('infants', -1)}
                    disabled={travelers.infants <= 0}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="w-8 text-center text-lg font-medium">{travelers.infants}</span>
                  <button
                    type="button"
                    onClick={() => updateTraveler('infants', 1)}
                    disabled={totalTravelers >= maxTravelers}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-gray-900 py-3 font-semibold text-white"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export function StickyMobileBar({ price, affiliateLink, pricingType, maxGroupSize, productCode }) {
  const { formatPrice } = useCurrency();
  const pricingLabel = getPricingLabel(pricingType, maxGroupSize);
  const [isVisible, setIsVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTravelerPicker, setShowTravelerPicker] = useState(false);
  
  const minDate = addDays(new Date(), 1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, infants: 0 });
  const [availability, setAvailability] = useState(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(null);
  
  const checkoutLink = generateViatorCheckoutLink(affiliateLink);
  const totalTravelers = travelers.adults + travelers.children + travelers.infants;

  const checkAvailability = useCallback(async () => {
    if (!selectedDate || !productCode) return;
    
    setIsCheckingAvailability(true);
    setAvailabilityError(null);
    setAvailability(null);
    
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const response = await fetch(
        `/api/viator/availability?productCode=${productCode}&date=${dateStr}&travelers=${totalTravelers}`
      );
      const data = await response.json();
      
      if (data.success && data.availability) {
        setAvailability(data.availability);
      } else {
        setAvailabilityError('Unable to check');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailabilityError('Unable to check');
    } finally {
      setIsCheckingAvailability(false);
    }
  }, [selectedDate, totalTravelers, productCode]);

  useEffect(() => {
    if (selectedDate) {
      checkAvailability();
    }
  }, [selectedDate, checkAvailability]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(!isSaved);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.1)] lg:hidden">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="mb-2 flex gap-2">
            <button
              onClick={() => setShowDatePicker(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-sm"
            >
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className={selectedDate ? "font-medium" : "text-gray-500"}>
                {selectedDate ? format(selectedDate, 'MMM d') : 'Date'}
              </span>
            </button>
            <button
              onClick={() => setShowTravelerPicker(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-sm"
            >
              <Users className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{totalTravelers} travelers</span>
            </button>
          </div>
          
          {selectedDate && (
            <div className="mb-2">
              {isCheckingAvailability ? (
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Checking...
                </div>
              ) : availabilityError ? (
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <AlertCircle className="h-3 w-3" />
                  Check availability on Viator
                </div>
              ) : availability ? (
                <div className={`flex items-center justify-center gap-1 text-xs ${
                  availability.status === 'SOLD_OUT' || availability.status === 'UNAVAILABLE'
                    ? 'text-red-600'
                    : availability.status === 'LIMITED'
                    ? 'text-amber-600'
                    : 'text-green-600'
                }`}>
                  {availability.status === 'SOLD_OUT' || availability.status === 'UNAVAILABLE' ? (
                    <>
                      <AlertCircle className="h-3 w-3" />
                      {availability.status === 'UNAVAILABLE' ? 'Not available' : 'Sold out'}
                    </>
                  ) : availability.status === 'LIMITED' ? (
                    <>
                      <AlertCircle className="h-3 w-3" />
                      Limited spots
                    </>
                  ) : (
                    <>
                      <Check className="h-3 w-3" />
                      Available
                    </>
                  )}
                </div>
              ) : null}
            </div>
          )}
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-gray-600">from</span>
                <span className="text-xl font-bold">
                  {formatPrice(price)}
                </span>
              </div>
              <div className="text-xs text-gray-500">{pricingLabel}</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors hover:bg-gray-50"
                aria-label="Save to wishlist"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isSaved ? "fill-red-500 text-red-500" : "text-gray-700"
                  }`}
                />
              </button>

              <a
                href={checkoutLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                <span className="whitespace-nowrap text-sm">Book on Viator</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {showDatePicker && (
        <MobileDatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          minDate={minDate}
          onClose={() => setShowDatePicker(false)}
        />
      )}
      
      {showTravelerPicker && (
        <MobileTravelerPicker
          travelers={travelers}
          onTravelersChange={setTravelers}
          pricingType={pricingType}
          maxGroupSize={maxGroupSize}
          onClose={() => setShowTravelerPicker(false)}
        />
      )}
    </>
  );
}
