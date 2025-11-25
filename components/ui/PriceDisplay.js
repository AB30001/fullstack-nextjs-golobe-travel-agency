"use client";

import { useCurrency } from "@/lib/contexts/CurrencyContext";

export function PriceDisplay({ amount, className = "", showFrom = false }) {
  const { formatPrice, isLoading } = useCurrency();

  if (isLoading) {
    return <span className={className}>...</span>;
  }

  return (
    <span className={className}>
      {showFrom && <span className="text-xs text-gray-500 mr-1">From</span>}
      {formatPrice(amount)}
    </span>
  );
}

export function PriceDisplayLarge({ amount, className = "" }) {
  const { formatPrice, isLoading } = useCurrency();

  if (isLoading) {
    return (
      <div className={className}>
        <div className="text-sm text-gray-600">From</div>
        <div className="text-3xl font-bold">...</div>
        <div className="text-sm text-gray-600">per adult</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="text-sm text-gray-600">From</div>
      <div className="text-3xl font-bold">{formatPrice(amount)}</div>
      <div className="text-sm text-gray-600">per adult</div>
    </div>
  );
}
