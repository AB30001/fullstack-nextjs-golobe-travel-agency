"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCurrency } from "@/lib/contexts/CurrencyContext";

export function CurrencySelector({ className = "" }) {
  const { currency, supportedCurrencies, changeCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currencies = Object.values(supportedCurrencies);
  const currentCurrency = supportedCurrencies[currency];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        <span>{currentCurrency.symbol}</span>
        <span>{currency}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  changeCurrency(curr.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${
                  currency === curr.code
                    ? "bg-blue-50 font-medium text-blue-700"
                    : "text-gray-700"
                }`}
              >
                <span className="w-6 text-center">{curr.symbol}</span>
                <span>{curr.code}</span>
                <span className="text-xs text-gray-500">- {curr.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
