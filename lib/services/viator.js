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
      limit = 30,
      offset = 0,
      sortOrder = 'TRAVELER_RATING'
    } = options;

    try {
      const body = {
        filtering: {
          destination: destinationId
        },
        currency,
        pagination: {
          offset,
          limit
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
      const response = await fetch(`${VIATOR_API_BASE_URL}/products/${productCode}`, {
        method: 'GET',
        headers: this.baseHeaders,
      });

      if (!response.ok) {
        throw new Error(`Viator API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching Viator product ${productCode}:`, error);
      throw error;
    }
  }

  async getAvailabilitySchedule(productCode) {
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
      return data;
    } catch (error) {
      console.error(`Error fetching availability for ${productCode}:`, error);
      throw error;
    }
  }

  async getAllNordicProducts(maxPerCountry = 50) {
    const nordicDestinations = await this.getNordicDestinations();
    const allProducts = [];

    for (const [country, destinations] of Object.entries(nordicDestinations)) {
      if (destinations.length === 0) continue;

      const mainDestination = destinations[0];
      
      try {
        const products = await this.searchProducts(mainDestination.destinationId, {
          limit: maxPerCountry,
          sortOrder: 'TRAVELER_RATING'
        });

        const enrichedProducts = [];
        for (const product of products) {
          try {
            const fullProduct = await this.getProductDetails(product.productCode);
            // Merge search data (which has pricing) with detailed data
            enrichedProducts.push({
              ...product,  // Keep search data including pricingInfo
              ...fullProduct,  // Add detailed data (images, descriptions, etc.)
              pricingInfo: product.pricingInfo,  // Explicitly preserve pricing from search
              _country: country,
              _destinationName: mainDestination.name
            });
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (error) {
            console.error(`Error fetching details for ${product.productCode}:`, error);
            enrichedProducts.push({
              ...product,
              _country: country,
              _destinationName: mainDestination.name
            });
          }
        }

        allProducts.push(...enrichedProducts);
      } catch (error) {
        console.error(`Error fetching products for ${country}:`, error);
      }

      await new Promise(resolve => setTimeout(resolve, 200));
    }

    return allProducts;
  }
}

export const viatorService = new ViatorService();
