import { Check, X, AlertCircle } from "lucide-react";

export function AdditionalInfo({ experience }) {
  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Additional information</h2>
      
      <div className="space-y-4 text-sm">
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div>
            <span className="font-medium">Confirmation:</span> Confirmation will be received at
            time of booking
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div>
            <span className="font-medium">Accessibility:</span> Near public transportation
          </div>
        </div>

        <div className="flex items-start gap-3">
          <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <div>
            <span className="font-medium">Not wheelchair accessible</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div>
            <span className="font-medium">Participation:</span> Most travelers can participate
          </div>
        </div>

        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <span className="font-medium">Children:</span> Children must be accompanied by an
            adult
          </div>
        </div>

        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <span className="font-medium">Weather dependent:</span> This experience requires good
            weather. If it's canceled due to poor weather, you'll be offered a different date or a
            full refund
          </div>
        </div>

        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <span className="font-medium">Group size:</span> This tour/activity will have a
            maximum of 19 travelers
          </div>
        </div>
      </div>
    </div>
  );
}
