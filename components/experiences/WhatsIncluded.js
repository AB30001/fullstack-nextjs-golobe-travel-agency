"use client";

import { Check, X } from "lucide-react";

export function WhatsIncluded({ inclusions, exclusions }) {
  if ((!inclusions || inclusions.length === 0) && (!exclusions || exclusions.length === 0)) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-white p-6">
      <h2 className="mb-6 text-2xl font-bold">What's Included</h2>
      
      {inclusions && inclusions.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Included</h3>
          <div className="space-y-3">
            {inclusions.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-3.5 w-3.5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">
                    {item.description || item.typeDescription}
                  </p>
                  {item.categoryDescription && item.description !== item.categoryDescription && (
                    <p className="mt-1 text-sm text-gray-500">{item.categoryDescription}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {exclusions && exclusions.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Not Included</h3>
          <div className="space-y-3">
            {exclusions.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <X className="h-3.5 w-3.5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">
                    {item.description || item.typeDescription}
                  </p>
                  {item.categoryDescription && item.description !== item.categoryDescription && (
                    <p className="mt-1 text-sm text-gray-500">{item.categoryDescription}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
