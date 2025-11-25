import { NextResponse } from "next/server";

const FALLBACK_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  NOK: 10.85,
  SEK: 10.45,
  DKK: 6.88,
  ISK: 137.5,
};

let cachedRates = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000;

export async function GET() {
  const now = Date.now();
  
  if (cachedRates && (now - cacheTimestamp) < CACHE_DURATION) {
    return NextResponse.json({ 
      rates: cachedRates, 
      cached: true,
      lastUpdated: new Date(cacheTimestamp).toISOString()
    });
  }

  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD",
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error("Exchange rate API failed");
    }

    const data = await response.json();
    
    const rates = {
      USD: 1,
      EUR: data.rates.EUR || FALLBACK_RATES.EUR,
      GBP: data.rates.GBP || FALLBACK_RATES.GBP,
      NOK: data.rates.NOK || FALLBACK_RATES.NOK,
      SEK: data.rates.SEK || FALLBACK_RATES.SEK,
      DKK: data.rates.DKK || FALLBACK_RATES.DKK,
      ISK: data.rates.ISK || FALLBACK_RATES.ISK,
    };

    cachedRates = rates;
    cacheTimestamp = now;

    return NextResponse.json({ 
      rates, 
      cached: false,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error("Exchange rate fetch error:", error);
    return NextResponse.json({ 
      rates: FALLBACK_RATES, 
      cached: false,
      fallback: true,
      lastUpdated: new Date().toISOString()
    });
  }
}
