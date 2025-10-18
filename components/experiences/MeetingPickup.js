import { MapPin, Clock } from "lucide-react";

export function MeetingPickup({ experience }) {
  const pickupLocations = [
    "Ráðhúsið - City Hall",
    "Safnahúsið The Culture House",
    "Hallgrimskirkja",
    "BSÍ Bus Terminal",
  ];

  return (
    <div id="details" className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Meeting and pickup</h2>
      
      <div className="mb-6">
        <h3 className="mb-3 font-semibold">Start</h3>
        <div className="text-sm text-gray-700">Multiple pickup locations offered.</div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 font-semibold">Pickup details</h3>
        {experience.meetingPoint && (
          <div className="mb-4 rounded-lg bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-gray-600" />
              <div>
                <div className="font-medium">Meeting Point</div>
                <div className="text-sm text-gray-600">{experience.meetingPoint}</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-4 rounded-lg bg-blue-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-900">IMPORTANT</span>
          </div>
          <div className="text-sm text-blue-800">
            The pickup starts at 8:00 am and usually takes place between 8:00 and 8:30 am.
          </div>
          <div className="mt-2 text-sm text-blue-800">
            <span className="font-medium">DROP-OFF:</span> You will be dropped off at approximately
            6:00pm from your original pick-up location. Times may change depending on weather and
            road conditions.
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 font-semibold">Pickup points</h3>
        <div className="space-y-2">
          {pickupLocations.map((location, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
              <MapPin className="h-4 w-4 text-gray-400" />
              {location}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">What to expect</h3>
        <p className="text-sm text-gray-700">
          Meet a driver at your hotel in {experience.city}, boarding a Mercedes Benz Sprinter
          minibus for a day of {experience.category} adventures. Since the van has Wi-Fi, you can
          keep up with emails or post to social media on the way to your destination.
        </p>
      </div>
    </div>
  );
}
