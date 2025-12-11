const VIATOR_API_BASE_URL = 'https://api.viator.com/partner';
const API_KEY = process.env.VIATOR_API_KEY;

export class ViatorService {
  constructor() {
    this.apiKey = API_KEY;
    this.baseHeaders = {
      'exp-api-key': this.apiKey,
      'Accept-Language': 'en-US',
      'Accept': 'application/json;version=2.0',
      'Content-Type': 'application/json'
    };
  }

  async fetchDestinations() {
    try {
      const response = await fetch(`${VIATOR_API_BASE_URL}/destinations`, {
        method: 'GET',
        headers: this.baseHeaders,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Viator API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return data.destinations || [];
    } catch (error) {
      console.error('Error fetching Viator destinations:', error);
      throw error;
    }
  }

  async getNordicDestinations() {
    const allDestinations = await this.fetchDestinations();
    
    const nordicKeywords = [
      'norway', 'sweden', 'iceland', 'denmark', 'finland',
      'oslo', 'bergen', 'trondheim', 'tromsø',
      'stockholm', 'gothenburg', 'malmo',
      'reykjavik', 'akureyri',
      'copenhagen', 'aarhus',
      'helsinki', 'tampere', 'rovaniemi'
    ];

    const nordicDestinations = allDestinations.filter(dest => {
      const name = dest.name?.toLowerCase() || '';
      return nordicKeywords.some(keyword => name.includes(keyword));
    });

    return {
      norway: nordicDestinations.filter(d => 
        d.name?.toLowerCase().includes('norway') || 
        ['oslo', 'bergen', 'trondheim', 'tromsø', 'tromso'].some(city => 
          d.name?.toLowerCase().includes(city)
        )
      ),
      sweden: nordicDestinations.filter(d => 
        d.name?.toLowerCase().includes('sweden') || 
        ['stockholm', 'gothenburg', 'malmo'].some(city => 
          d.name?.toLowerCase().includes(city)
        )
      ),
      iceland: nordicDestinations.filter(d => 
        d.name?.toLowerCase().includes('iceland') || 
        ['reykjavik', 'akureyri'].some(city => 
          d.name?.toLowerCase().includes(city)
        )
      ),
      denmark: nordicDestinations.filter(d => 
        d.name?.toLowerCase().includes('denmark') || 
        ['copenhagen', 'aarhus'].some(city => 
          d.name?.toLowerCase().includes(city)
        )
      ),
      finland: nordicDestinations.filter(d => 
        d.name?.toLowerCase().includes('finland') || 
        ['helsinki', 'tampere', 'rovaniemi'].some(city => 
          d.name?.toLowerCase().includes(city)
        )
      ),
    };
  }

  async searchProducts(destinationId, options = {}) {
    const {
      currency = 'USD',
      count = 50,
      start = 1,
      sortOrder = 'TRAVELER_RATING'
    } = options;

    try {
      const body = {
        filtering: {
          destination: destinationId
        },
        currency,
        pagination: {
          start,
          count
        },
        sorting: {
          sort: sortOrder
        }
      };

      const response = await fetch(`${VIATOR_API_BASE_URL}/products/search`, {
        method: 'POST',
        headers: this.baseHeaders,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Viator API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error(`Error searching Viator products for destination ${destinationId}:`, error);
      throw error;
    }
  }

  async getProductDetails(productCode) {
    try {
      // Request with USD currency to get consistent pricing
      const response = await fetch(`${VIATOR_API_BASE_URL}/products/${productCode}?currency=USD`, {
        method: 'GET',
        headers: this.baseHeaders,
      });

      if (!response.ok) {
        throw new Error(`Viator API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Log pricing data for debugging
      console.log(`Product ${productCode} pricing data:`, {
        pricingInfoSummary: data.pricingInfo?.summary,
        pricingFromPrice: data.pricing?.fromPrice,
        directFromPrice: data.fromPrice
      });
      
      return data;
    } catch (error) {
      console.error(`Error fetching Viator product ${productCode}:`, error);
      throw error;
    }
  }

  async getProductsBulk(productCodes, currency = 'USD') {
    if (!productCodes || productCodes.length === 0) {
      return [];
    }

    const codes = productCodes.slice(0, 500);

    try {
      const response = await fetch(`${VIATOR_API_BASE_URL}/products/bulk`, {
        method: 'POST',
        headers: this.baseHeaders,
        body: JSON.stringify({
          productCodes: codes,
          currency
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Viator API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error fetching bulk products:', error);
      throw error;
    }
  }

  async getProductsModifiedSince(modifiedSince, cursor = null, count = 100) {
    try {
      const params = new URLSearchParams({
        count: count.toString()
      });

      if (cursor) {
        params.append('cursor', cursor);
      } else if (modifiedSince) {
        params.append('modifiedSince', modifiedSince);
      }

      const response = await fetch(`${VIATOR_API_BASE_URL}/products/modified-since?${params}`, {
        method: 'GET',
        headers: this.baseHeaders,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Modified-since API error: ${response.status} - ${errorText}`);
        throw new Error(`Viator API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log(`Modified-since returned ${data.products?.length || 0} products`);
      return {
        products: data.products || [],
        nextCursor: data.nextCursor || null,
        totalCount: data.totalCount || 0
      };
    } catch (error) {
      console.error('Error fetching modified products:', error);
      throw error;
    }
  }

  async searchFreetext(searchTerm, options = {}) {
    const {
      currency = 'USD',
      count = 20,
      topX = '1-20',
      destId = null,
      sortOrder = 'REVIEW_AVG_RATING_D'
    } = options;

    try {
      const body = {
        text: searchTerm,
        currencyCode: currency,
        topX,
        sortOrder,
        searchTypes: ['PRODUCTS']
      };

      if (destId) {
        body.destId = destId;
      }

      const response = await fetch(`${VIATOR_API_BASE_URL}/search/freetext`, {
        method: 'POST',
        headers: this.baseHeaders,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Viator API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return {
        products: data.products || [],
        totalCount: data.totalCount || 0
      };
    } catch (error) {
      console.error(`Error searching Viator for "${searchTerm}":`, error);
      throw error;
    }
  }

  async getAvailabilitySchedule(productCode, date = null, travelers = null) {
    try {
      const response = await fetch(`${VIATOR_API_BASE_URL}/availability/schedules/${productCode}`, {
        method: 'GET',
        headers: this.baseHeaders,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Viator API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      if (date && data.bookableItems) {
        const dateStr = date;
        const matchingSlots = data.bookableItems.filter(item => {
          if (item.startDate && item.endDate) {
            return dateStr >= item.startDate && dateStr <= item.endDate;
          }
          return true;
        });
        
        if (matchingSlots.length === 0) {
          return { status: 'UNAVAILABLE', message: 'No availability for selected date' };
        }
        
        const hasAvailability = matchingSlots.some(slot => 
          !slot.soldOut && (slot.available === undefined || slot.available > 0)
        );
        
        if (!hasAvailability) {
          return { status: 'SOLD_OUT', message: 'Sold out for selected date' };
        }
        
        const limitedAvailability = matchingSlots.some(slot =>
          slot.available !== undefined && slot.available > 0 && slot.available < 5
        );
        
        if (limitedAvailability) {
          return { status: 'LIMITED', message: 'Limited spots remaining' };
        }
      }
      
      return { status: 'AVAILABLE', message: 'Available' };
    } catch (error) {
      console.error(`Error fetching availability for ${productCode}:`, error);
      throw error;
    }
  }

  async getProductPricing(productCode) {
    // Helper to extract numeric price and currency from various formats
    const extractPriceInfo = (priceData) => {
      if (priceData === null || priceData === undefined) return { price: 0, currency: null };
      if (typeof priceData === 'number') return { price: priceData, currency: null };
      if (typeof priceData === 'string') return { price: parseFloat(priceData) || 0, currency: null };
      if (typeof priceData === 'object') {
        const price = Number(priceData.amount ?? priceData.value ?? priceData.price ?? priceData.recommendedRetailPrice ?? 0);
        const currency = priceData.currency || priceData.currencyCode || null;
        return { price, currency };
      }
      return { price: 0, currency: null };
    };
    
    // Approximate exchange rates to USD (fallback)
    const exchangeRatesToUSD = {
      'USD': 1,
      'EUR': 1.08,
      'GBP': 1.27,
      'NOK': 0.091,
      'SEK': 0.095,
      'DKK': 0.145,
      'ISK': 0.0072
    };
    
    const convertToUSD = (amount, currency) => {
      if (!currency || currency === 'USD') return amount;
      const rate = exchangeRatesToUSD[currency];
      if (rate) {
        const converted = amount * rate;
        console.log(`Converting ${amount} ${currency} to USD: ${converted} (rate: ${rate})`);
        return converted;
      }
      console.log(`Unknown currency ${currency}, returning original amount`);
      return amount;
    };
    
    try {
      // Try POST request with currency in body (more reliable for Viator API)
      const response = await fetch(`${VIATOR_API_BASE_URL}/availability/schedules/${productCode}`, {
        method: 'GET',
        headers: {
          ...this.baseHeaders,
          'Accept-Currency': 'USD'
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      
      // Get currency from response
      const responseCurrency = data.currency || data.summary?.currency || 'USD';
      console.log(`Product ${productCode} availability response currency: ${responseCurrency}`);
      
      // Extract fromPrice from availability schedules response
      if (data.summary?.fromPrice) {
        const priceInfo = extractPriceInfo(data.summary.fromPrice);
        const currency = priceInfo.currency || responseCurrency;
        if (priceInfo.price > 0) {
          const usdPrice = convertToUSD(priceInfo.price, currency);
          return Math.round(usdPrice * 100) / 100; // Round to 2 decimals
        }
      }
      
      // Try to extract from bookableItems
      if (data.bookableItems && data.bookableItems.length > 0) {
        let lowestPrice = null;
        let foundCurrency = responseCurrency;
        
        for (const item of data.bookableItems) {
          if (item.seasons) {
            for (const season of item.seasons) {
              if (season.pricingRecords) {
                for (const record of season.pricingRecords) {
                  if (record.timedEntries) {
                    for (const entry of record.timedEntries) {
                      if (entry.pricingDetails) {
                        for (const detail of entry.pricingDetails) {
                          const priceInfo = extractPriceInfo(detail.price || detail.retailPrice || detail.merchantNetPrice);
                          if (priceInfo.currency) foundCurrency = priceInfo.currency;
                          if (priceInfo.price > 0 && (lowestPrice === null || priceInfo.price < lowestPrice)) {
                            lowestPrice = priceInfo.price;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        
        if (lowestPrice !== null && lowestPrice > 0) {
          const usdPrice = convertToUSD(lowestPrice, foundCurrency);
          return Math.round(usdPrice * 100) / 100;
        }
      }
      
      return null;
    } catch (error) {
      console.error(`Error fetching pricing for ${productCode}:`, error);
      return null;
    }
  }

  async getAllNordicProducts(maxPerCountry = 50) {
    const nordicDestinations = await this.getNordicDestinations();
    const allProducts = [];
    const allProductCodes = [];

    for (const [country, destinations] of Object.entries(nordicDestinations)) {
      if (destinations.length === 0) continue;

      for (const destination of destinations.slice(0, 3)) {
        try {
          const products = await this.searchProducts(destination.destinationId, {
            count: maxPerCountry,
            sortOrder: 'TRAVELER_RATING'
          });

          for (const product of products) {
            allProductCodes.push({
              code: product.productCode,
              country,
              destinationName: destination.name,
              searchData: product
            });
          }
        } catch (error) {
          console.error(`Error fetching products for ${country} - ${destination.name}:`, error);
        }

        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    const uniqueCodes = [...new Map(allProductCodes.map(p => [p.code, p])).values()];
    console.log(`Found ${uniqueCodes.length} unique product codes, fetching details in bulk...`);

    for (let i = 0; i < uniqueCodes.length; i += 500) {
      const batch = uniqueCodes.slice(i, i + 500);
      const codes = batch.map(p => p.code);
      
      try {
        const bulkProducts = await this.getProductsBulk(codes);
        
        for (const fullProduct of bulkProducts) {
          const meta = batch.find(p => p.code === fullProduct.productCode);
          if (meta) {
            allProducts.push({
              ...meta.searchData,
              ...fullProduct,
              title: meta.searchData.title || fullProduct.title,
              pricing: meta.searchData.pricing || fullProduct.pricing,
              pricingInfo: fullProduct.pricingInfo || meta.searchData.pricingInfo,
              _country: meta.country,
              _destinationName: meta.destinationName
            });
          }
        }
        
        console.log(`Fetched batch ${Math.floor(i/500) + 1}: ${bulkProducts.length} products`);
      } catch (error) {
        console.error(`Error fetching bulk products batch ${Math.floor(i/500) + 1}:`, error);
        
        for (const item of batch) {
          try {
            const fullProduct = await this.getProductDetails(item.code);
            allProducts.push({
              ...item.searchData,
              ...fullProduct,
              title: item.searchData.title || fullProduct.title,
              pricing: item.searchData.pricing || fullProduct.pricing,
              pricingInfo: fullProduct.pricingInfo || item.searchData.pricingInfo,
              _country: item.country,
              _destinationName: item.destinationName
            });
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (err) {
            console.error(`Error fetching details for ${item.code}:`, err);
            allProducts.push({
              ...item.searchData,
              _country: item.country,
              _destinationName: item.destinationName
            });
          }
        }
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return allProducts;
  }

  async updateModifiedProducts(existingProductCodes, lastSyncTime) {
    const modifiedProducts = [];
    let cursor = null;
    let hasMore = true;

    while (hasMore) {
      const result = await this.getProductsModifiedSince(lastSyncTime, cursor);
      
      const relevantProducts = result.products.filter(p => 
        existingProductCodes.includes(p.productCode)
      );
      modifiedProducts.push(...relevantProducts);
      
      cursor = result.nextCursor;
      hasMore = !!cursor;
      
      if (hasMore) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    return modifiedProducts;
  }
}

export const viatorService = new ViatorService();
