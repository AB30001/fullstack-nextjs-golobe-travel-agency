"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SUPPORTED_CURRENCIES = {
  USD: { code: "USD", symbol: "$", name: "US Dollar" },
  EUR: { code: "EUR", symbol: "€", name: "Euro" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound" },
  NOK: { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  SEK: { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  DKK: { code: "DKK", symbol: "kr", name: "Danish Krone" },
  ISK: { code: "ISK", symbol: "kr", name: "Icelandic Krona" },
};

const COUNTRY_TO_CURRENCY = {
  US: "USD",
  GB: "GBP",
  NO: "NOK",
  SE: "SEK",
  DK: "DKK",
  IS: "ISK",
  FI: "EUR",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  IE: "EUR",
  PT: "EUR",
};

const CurrencyContext = createContext(undefined);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({ USD: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [currencyReady, setCurrencyReady] = useState(false);
  const [ratesReady, setRatesReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const savedCurrency = localStorage.getItem("preferredCurrency");
      if (savedCurrency && SUPPORTED_CURRENCIES[savedCurrency]) {
        setCurrency(savedCurrency);
        setCurrencyReady(true);
      } else {
        await detectUserCurrency();
        setCurrencyReady(true);
      }
    };
    init();
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (currencyReady && ratesReady) {
      setIsLoading(false);
    }
  }, [currencyReady, ratesReady]);

  const detectUserCurrency = async () => {
    // Skip detection in environments where external APIs are blocked
    if (typeof window === "undefined") return;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch("https://ipapi.co/json/", {
        signal: controller.signal,
        mode: "cors",
      }).catch(() => null);
      
      clearTimeout(timeoutId);
      
      if (!response || !response.ok) return;
      
      const data = await response.json().catch(() => null);
      if (!data || !data.country_code) return;
      
      const detectedCurrency = COUNTRY_TO_CURRENCY[data.country_code] || "USD";
      if (SUPPORTED_CURRENCIES[detectedCurrency]) {
        setCurrency(detectedCurrency);
        localStorage.setItem("preferredCurrency", detectedCurrency);
      }
    } catch {
      // Silently fallback to USD - this is expected in some environments
    }
  };

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch("/api/exchange-rates");
      if (response.ok) {
        const data = await response.json();
        setExchangeRates(data.rates);
      }
    } catch (error) {
      // Use default rates
    } finally {
      setRatesReady(true);
    }
  };

  const changeCurrency = (newCurrency) => {
    if (SUPPORTED_CURRENCIES[newCurrency]) {
      setCurrency(newCurrency);
      localStorage.setItem("preferredCurrency", newCurrency);
    }
  };

  const convertPrice = (priceInUSD) => {
    if (!priceInUSD) return 0;
    const rate = exchangeRates[currency] || 1;
    return Math.round(priceInUSD * rate);
  };

  const formatPrice = (priceInUSD) => {
    const converted = convertPrice(priceInUSD);
    const currencyInfo = SUPPORTED_CURRENCIES[currency];
    
    if (currency === "USD") {
      return `$${converted.toLocaleString()}`;
    } else if (currency === "EUR") {
      return `€${converted.toLocaleString()}`;
    } else if (currency === "GBP") {
      return `£${converted.toLocaleString()}`;
    } else {
      return `${converted.toLocaleString()} ${currencyInfo.code}`;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencyInfo: SUPPORTED_CURRENCIES[currency],
        supportedCurrencies: SUPPORTED_CURRENCIES,
        changeCurrency,
        convertPrice,
        formatPrice,
        isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
