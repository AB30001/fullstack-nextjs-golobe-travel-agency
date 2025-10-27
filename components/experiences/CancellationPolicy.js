"use client";

import { Shield, Check, X } from "lucide-react";

export function CancellationPolicy({ cancellationPolicy }) {
  if (!cancellationPolicy) {
    return null;
  }

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <Shield className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">Cancellation Policy</h2>
      </div>
      
      {cancellationPolicy.description && (
        <p className="mb-6 text-gray-700">{cancellationPolicy.description}</p>
      )}
      
      {cancellationPolicy.refundEligibility && cancellationPolicy.refundEligibility.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-gray-900">Refund Schedule</h3>
          <div className="space-y-2">
            {cancellationPolicy.refundEligibility.map((refund, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  {refund.percentageRefundable > 0 ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <X className="h-5 w-5 text-red-600" />
                  )}
                  <span className="text-gray-700">
                    {refund.dayRangeMin && refund.dayRangeMax ? (
                      `${refund.dayRangeMin}-${refund.dayRangeMax} days before`
                    ) : refund.dayRangeMin ? (
                      `${refund.dayRangeMin}+ days before`
                    ) : refund.dayRangeMax ? (
                      `Within ${refund.dayRangeMax} days`
                    ) : (
                      'Same day'
                    )}
                  </span>
                </div>
                <span className={`font-semibold ${refund.percentageRefundable > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {refund.percentageRefundable}% refund
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-2 border-t pt-4 text-sm">
        {cancellationPolicy.cancelIfBadWeather && (
          <div className="flex items-start gap-2 text-gray-600">
            <Check className="h-4 w-4 mt-0.5 text-green-600" />
            <span>Cancellation possible due to bad weather</span>
          </div>
        )}
        
        {cancellationPolicy.cancelIfInsufficientTravelers && (
          <div className="flex items-start gap-2 text-gray-600">
            <Check className="h-4 w-4 mt-0.5 text-green-600" />
            <span>Cancellation possible if minimum number of travelers not met</span>
          </div>
        )}
      </div>
    </div>
  );
}
