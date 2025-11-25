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

  useEffect(() => {
    const savedCurrency = localStorage.getItem("preferredCurrency");
    if (savedCurrency && SUPPORTED_CURRENCIES[savedCurrency]) {
      setCurrency(savedCurrency);
    } else {
      detectUserCurrency();
    }
    fetchExchangeRates();
  }, []);

  const detectUserCurrency = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      const countryCode = data.country_code;
      const detectedCurrency = COUNTRY_TO_CURRENCY[countryCode] || "USD";
      if (SUPPORTED_CURRENCIES[detectedCurrency]) {
        setCurrency(detectedCurrency);
        localStorage.setItem("preferredCurrency", detectedCurrency);
      }
    } catch (error) {
      console.log("Could not detect location, using USD");
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
      console.log("Could not fetch exchange rates, using defaults");
    } finally {
      setIsLoading(false);
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
