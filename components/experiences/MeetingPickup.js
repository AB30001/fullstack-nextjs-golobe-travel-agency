"use client";

import { MapPin, Clock } from "lucide-react";

export function MeetingPickup({ meetingPoint, endPoint, travelerPickup }) {
  if (!meetingPoint && !endPoint && !travelerPickup) {
    return null;
  }

  return (
    <div id="details" className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Meeting and Pickup</h2>
      
      <div className="space-y-6">
        {/* Meeting Point */}
        {meetingPoint && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <MapPin className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Meeting point</h3>
            </div>
            
            {meetingPoint.address && (
              <p className="mb-2 ml-10 font-medium text-gray-900">
                {meetingPoint.address}
              </p>
            )}
            
            {meetingPoint.description && (
              <p className="ml-10 whitespace-pre-line text-gray-700">
                {meetingPoint.description}
              </p>
            )}
          </div>
        )}
        
        {/* End Point */}
        {endPoint && (
          <div className="border-t pt-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <MapPin className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">End point</h3>
            </div>
            
            {endPoint.address && (
              <p className="mb-2 ml-10 font-medium text-gray-900">
                {endPoint.address}
              </p>
            )}
            
            {endPoint.description && (
              <p className="ml-10 whitespace-pre-line text-gray-700">
                {endPoint.description}
              </p>
            )}
          </div>
        )}
        
        {/* Traveler Pickup Info */}
        {travelerPickup && travelerPickup.additionalInfo && (
          <div className="rounded-lg border-t bg-blue-50 p-4">
            <div className="flex gap-3">
              <Clock className="h-5 w-5 flex-shrink-0 text-blue-600" />
              <div>
                <h4 className="mb-1 font-semibold text-gray-900">Pickup Information</h4>
                <p className="whitespace-pre-line text-sm text-gray-700">
                  {travelerPickup.additionalInfo}
                </p>
                {travelerPickup.minutesBeforeDepartureTimeForPickup > 0 && (
                  <p className="mt-2 text-sm text-gray-600">
                    Please arrive {travelerPickup.minutesBeforeDepartureTimeForPickup} minutes before departure
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
