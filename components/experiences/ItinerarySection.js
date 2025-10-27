"use client";

import { Clock, MapPin, Ticket } from "lucide-react";

export function ItinerarySection({ itinerary }) {
  if (!itinerary || !itinerary.itineraryItems || itinerary.itineraryItems.length === 0) {
    return null;
  }

  const formatDuration = (minutes) => {
    if (!minutes) return null;
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} hours ${mins} minutes` : `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  };

  return (
    <div className="rounded-lg border bg-white p-6">
      <h2 className="mb-2 text-2xl font-bold">Itinerary</h2>
      
      {itinerary.privateTour && (
        <p className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          Private Tour
        </p>
      )}
      
      <div className="relative space-y-6">
        {itinerary.itineraryItems.map((item, index) => (
          <div key={index} className="relative flex gap-4">
            {/* Step number */}
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {index + 1}
              </div>
              {index < itinerary.itineraryItems.length - 1 && (
                <div className="mt-2 h-full w-0.5 bg-gray-200"></div>
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 pb-8">
              {item.pointOfInterestName && (
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {item.pointOfInterestName}
                </h3>
              )}
              
              <p className="mb-3 text-gray-700">{item.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {item.duration?.fixedDurationInMinutes && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(item.duration.fixedDurationInMinutes)}</span>
                  </div>
                )}
                
                {item.admissionIncluded && item.admissionIncluded !== 'NOT_APPLICABLE' && (
                  <div className="flex items-center gap-1.5">
                    <Ticket className="h-4 w-4" />
                    <span>
                      {item.admissionIncluded === 'YES' ? 'Admission Ticket Included' : 'Admission Ticket Free'}
                    </span>
                  </div>
                )}
                
                {item.passByWithoutStopping && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>Pass by without stopping</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
