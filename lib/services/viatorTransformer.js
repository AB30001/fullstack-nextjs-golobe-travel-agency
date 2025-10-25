function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function mapCountry(countryStr) {
  const countryMap = {
    'norway': 'Norway',
    'sweden': 'Sweden',
    'iceland': 'Iceland',
    'denmark': 'Denmark',
    'finland': 'Finland'
  };
  
  const normalized = countryStr?.toLowerCase();
  return countryMap[normalized] || 'Norway';
}

function mapCategory(viatorTags, title, description) {
  const text = `${title} ${description} ${viatorTags?.join(' ')}`.toLowerCase();
  
  if (text.includes('northern lights') || text.includes('aurora')) {
    return 'Northern Lights';
  }
  if (text.includes('fjord') || text.includes('cruise')) {
    return 'Fjord Tours';
  }
  if (text.includes('whale') || text.includes('safari') || text.includes('wildlife')) {
    return 'Wildlife Safari';
  }
  if (text.includes('hiking') || text.includes('trekking') || text.includes('walking')) {
    return 'Hiking & Trekking';
  }
  if (text.includes('ski') || text.includes('snow') || text.includes('winter sport')) {
    return 'Winter Sports';
  }
  if (text.includes('culture') || text.includes('museum') || text.includes('heritage')) {
    return 'Cultural Tours';
  }
  if (text.includes('food') || text.includes('culinary') || text.includes('wine') || text.includes('tasting')) {
    return 'Food & Drink';
  }
  if (text.includes('boat') || text.includes('sailing') || text.includes('cruise')) {
    return 'Boat Tours';
  }
  if (text.includes('city tour') || text.includes('sightseeing')) {
    return 'City Tours';
  }
  if (text.includes('kayak') || text.includes('climbing') || text.includes('rafting') || text.includes('adventure')) {
    return 'Adventure Sports';
  }
  if (text.includes('nature') || text.includes('wildlife') || text.includes('bird')) {
    return 'Nature & Wildlife';
  }
  if (text.includes('photo')) {
    return 'Photography Tours';
  }
  if (text.includes('historic') || text.includes('ancient') || text.includes('viking')) {
    return 'Historical Sites';
  }
  if (text.includes('multi-day') || text.includes('overnight')) {
    return 'Multi-day Tours';
  }
  
  return 'City Tours';
}

function getPriceRange(price) {
  if (price < 50) return '$';
  if (price < 150) return '$$';
  if (price < 300) return '$$$';
  return '$$$$';
}

function parseDuration(viatorDuration) {
  if (!viatorDuration) return { value: 3, unit: 'hours' };
  
  const durationStr = viatorDuration.fixedDurationInMinutes || viatorDuration.duration;
  
  if (typeof durationStr === 'number') {
    const minutes = durationStr;
    if (minutes >= 1440) {
      return { value: Math.round(minutes / 1440), unit: 'days' };
    }
    return { value: Math.round(minutes / 60), unit: 'hours' };
  }
  
  if (typeof durationStr === 'string') {
    const hoursMatch = durationStr.match(/(\d+)\s*h/i);
    const daysMatch = durationStr.match(/(\d+)\s*d/i);
    
    if (daysMatch) {
      return { value: parseInt(daysMatch[1]), unit: 'days' };
    }
    if (hoursMatch) {
      return { value: parseInt(hoursMatch[1]), unit: 'hours' };
    }
  }
  
  return { value: 3, unit: 'hours' };
}

function extractImages(viatorProduct) {
  const imageUrls = new Set();
  
  // Extract from images array (hero images with variants)
  if (viatorProduct.images) {
    viatorProduct.images.forEach(img => {
      if (img.variants && img.variants.length > 0) {
        const largestVariant = img.variants.reduce((prev, current) => {
          return (current.width || 0) > (prev.width || 0) ? current : prev;
        });
        if (largestVariant.url) {
          imageUrls.add(largestVariant.url);
        }
      }
    });
  }
  
  // Also extract from productImages array (full gallery)
  if (viatorProduct.productImages) {
    viatorProduct.productImages.forEach(img => {
      if (img.imageUrl) {
        imageUrls.add(img.imageUrl);
      }
    });
  }
  
  // Convert Set to Array - get ALL images (no limit)
  const uniqueImages = Array.from(imageUrls);
  
  return uniqueImages.length > 0 ? uniqueImages : ['/images/default-experience.jpg'];
}

function getDefaultCoordinates(country) {
  const countryCoords = {
    'Norway': { lat: 60.472, lon: 8.468 },
    'Sweden': { lat: 60.128, lon: 18.643 },
    'Iceland': { lat: 64.126, lon: -21.817 },
    'Denmark': { lat: 55.676, lon: 12.568 },
    'Finland': { lat: 60.192, lon: 24.945 },
  };
  return countryCoords[country] || { lat: 60, lon: 10 };
}

export function transformViatorToExperience(viatorProduct) {
  const title = viatorProduct.title || viatorProduct.productTitle || 'Untitled Experience';
  const description = viatorProduct.description || viatorProduct.shortDescription || '';
  const longDescription = viatorProduct.description || viatorProduct.longDescription || description;
  
  const country = mapCountry(viatorProduct._country);
  const city = viatorProduct._destinationName || viatorProduct.destination?.destinationName || 'Unknown';
  
  // Extract price from correct Viator API field structure
  // According to Viator Partner API docs, pricing is in pricingInfo.fromPrice
  let priceValue = 100; // Default fallback
  
  if (viatorProduct.pricingInfo?.fromPrice) {
    priceValue = typeof viatorProduct.pricingInfo.fromPrice === 'object' 
      ? viatorProduct.pricingInfo.fromPrice.amount 
      : viatorProduct.pricingInfo.fromPrice;
  } else if (viatorProduct.pricing?.summary?.fromPrice) {
    priceValue = typeof viatorProduct.pricing.summary.fromPrice === 'object'
      ? viatorProduct.pricing.summary.fromPrice.amount
      : viatorProduct.pricing.summary.fromPrice;
  } else if (viatorProduct.price?.fromPrice) {
    priceValue = typeof viatorProduct.price.fromPrice === 'object'
      ? viatorProduct.price.fromPrice.amount
      : viatorProduct.price.fromPrice;
  }
  
  const images = extractImages(viatorProduct);
  const coverImage = images[0] || '/images/default-experience.jpg';
  
  const tags = viatorProduct.tags || [];
  const category = mapCategory(tags, title, description);
  
  const productCode = viatorProduct.productCode || viatorProduct.code;
  
  // Build proper Viator affiliate link following Golden Path guidelines
  // Format: https://www.viator.com/tours/{destination}/{productUrlName}/d{destinationId}-{productCode}?tracking
  let affiliateLink;
  if (viatorProduct.productUrl) {
    // Viator already provides the product URL, add tracking parameters
    const baseUrl = viatorProduct.productUrl;
    const separator = baseUrl.includes('?') ? '&' : '?';
    affiliateLink = `${baseUrl}${separator}mcid=42383&pid=P00273833&medium=api&api_version=2.0`;
  } else if (productCode) {
    // Fallback: construct the URL manually
    affiliateLink = `https://www.viator.com/tours/productCode/${productCode}?mcid=42383&pid=P00273833&medium=api&api_version=2.0`;
  } else {
    affiliateLink = 'https://www.viator.com';
  }
  
  // Handle highlights
  const highlights = viatorProduct.highlights || [];
  
  // Handle included/excluded items - convert objects to strings
  let included = [];
  if (viatorProduct.inclusions) {
    included = viatorProduct.inclusions.map(item => {
      if (typeof item === 'string') return item;
      return item.description || item.otherDescription || item.typeDescription || '';
    }).filter(Boolean);
  }
  
  let notIncluded = [];
  if (viatorProduct.exclusions) {
    notIncluded = viatorProduct.exclusions.map(item => {
      if (typeof item === 'string') return item;
      return item.description || item.otherDescription || item.typeDescription || '';
    }).filter(Boolean);
  }
  
  const rating = viatorProduct.reviews?.combinedAverageRating || viatorProduct.rating || 0;
  const totalReviews = viatorProduct.reviews?.totalReviews || viatorProduct.reviewCount || 0;
  
  const languagesOffered = viatorProduct.languages || ['English'];
  
  const coordinates = viatorProduct.location?.coordinates || getDefaultCoordinates(country);
  
  return {
    slug: `${generateSlug(title)}-${productCode}`.substring(0, 100),
    title: title.substring(0, 200),
    description: description.substring(0, 500),
    longDescription,
    country,
    city: city.substring(0, 100),
    region: viatorProduct.region || '',
    category,
    tags: tags.slice(0, 10),
    duration: parseDuration(viatorProduct.duration),
    priceRange: getPriceRange(priceValue),
    priceFrom: Math.round(priceValue),
    images: images,
    coverImage,
    affiliateLink,
    affiliatePartner: 'Viator',
    highlights: highlights.slice(0, 10),
    included: included.slice(0, 15),
    notIncluded: notIncluded.slice(0, 10),
    meetingPoint: viatorProduct.meetingPoint || '',
    languagesOffered: languagesOffered.slice(0, 5),
    averageRating: Math.min(5, Math.max(0, rating)),
    totalReviews: Math.max(0, totalReviews),
    isActive: true,
    coordinates: {
      lat: coordinates.lat || coordinates.latitude || getDefaultCoordinates(country).lat,
      lon: coordinates.lon || coordinates.longitude || getDefaultCoordinates(country).lon,
    },
  };
}

export function transformMultipleViatorProducts(viatorProducts) {
  return viatorProducts.map(product => {
    try {
      return transformViatorToExperience(product);
    } catch (error) {
      console.error('Error transforming product:', product.productCode, error);
      return null;
    }
  }).filter(Boolean);
}
