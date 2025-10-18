import { Shield } from "lucide-react";

export function CancellationPolicy() {
  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Cancellation policy</h2>
      
      <div className="mb-4 rounded-lg bg-green-50 p-4">
        <div className="mb-2 flex items-center gap-2 text-green-900">
          <Shield className="h-5 w-5" />
          <span className="font-semibold">For a full refund, you must cancel at least 24 hours before the experience's start time.</span>
        </div>
      </div>

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-start gap-2">
          <span className="text-red-600">•</span>
          <div>
            If you cancel <span className="font-medium">less than 24 hours</span> before the
            experience's start time, the amount you paid will not be refunded.
          </div>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-red-600">•</span>
          <div>
            Any changes made <span className="font-medium">less than 24 hours</span> before the
            experience's start time will not be accepted.
          </div>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-blue-600">•</span>
          <div>
            Cut-off times are based on the experience's <span className="font-medium">local time</span>.
          </div>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-blue-600">•</span>
          <div>
            This experience requires <span className="font-medium">good weather</span>. If it's
            canceled due to poor weather, you'll be offered a different date or a full refund.
          </div>
        </div>
      </div>

      <div className="mt-4">
        <a
          href="https://www.tripadvisorsupport.com/en-US/hc/traveler/articles/460"
          className="text-sm font-semibold text-black hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about cancellations →
        </a>
      </div>
    </div>
  );
}
