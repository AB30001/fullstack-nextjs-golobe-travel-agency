import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db/utilsDB';
import { Experience } from '@/lib/db/models';
import { viatorService } from '@/lib/services/viator';
import { transformViatorToExperience } from '@/lib/services/viatorTransformer';

function verifyAdminAuth(request) {
  const authHeader = request.headers.get('x-admin-password');
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword || authHeader !== adminPassword) {
    return false;
  }
  return true;
}

export async function GET(request) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const country = searchParams.get('country') || '';
    
    const skip = (page - 1) * limit;
    
    let query = { affiliatePartner: 'Viator' };
    
    if (country) {
      query.country = country;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Build sort object
    const sortOptions = {};
    const sortField = sortBy === 'price' ? 'priceFrom' : (sortBy === 'rating' ? 'averageRating' : 'createdAt');
    sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
    
    const [tours, total] = await Promise.all([
      Experience.find(query)
        .select('title slug country city category averageRating totalReviews priceFrom coverImage isActive createdAt')
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      Experience.countDocuments(query)
    ]);
    
    const serializedTours = tours.map(tour => ({
      _id: tour._id.toString(),
      title: tour.title,
      slug: tour.slug,
      country: tour.country,
      city: tour.city,
      category: tour.category,
      rating: tour.averageRating ?? tour.rating ?? 0,
      reviews: tour.totalReviews ?? tour.reviewCount ?? 0,
      price: tour.priceFrom ?? tour.price ?? 0,
      coverImage: tour.coverImage,
      isActive: tour.isActive,
      productCode: tour.slug?.split('-').pop()?.toUpperCase() || ''
    }));
    
    return NextResponse.json({
      success: true,
      tours: serializedTours,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching tours:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tours' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDB();
    
    const { productCodes } = await request.json();
    
    if (!productCodes || !Array.isArray(productCodes) || productCodes.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Product codes array is required' },
        { status: 400 }
      );
    }
    
    const cleanCodes = productCodes
      .map(code => code.trim().toUpperCase())
      .filter(code => code.length > 0);
    
    if (cleanCodes.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid product codes provided' },
        { status: 400 }
      );
    }
    
    const results = {
      added: [],
      failed: [],
      skipped: []
    };
    
    for (const productCode of cleanCodes) {
      try {
        const existingSlug = await Experience.findOne({ 
          slug: { $regex: productCode, $options: 'i' } 
        });
        
        if (existingSlug) {
          results.skipped.push({ 
            productCode, 
            reason: 'Tour already exists in database' 
          });
          continue;
        }
        
        const viatorProduct = await viatorService.getProductDetails(productCode);
        
        if (!viatorProduct || viatorProduct.status === 'INACTIVE') {
          results.failed.push({ 
            productCode, 
            reason: 'Product not found or inactive on Viator' 
          });
          continue;
        }
        
        const countryFromProduct = detectCountry(viatorProduct);
        const cityFromProduct = viatorProduct.destination?.destinationName || 'Unknown';
        
        viatorProduct._country = countryFromProduct;
        viatorProduct._destinationName = cityFromProduct;
        
        // Fetch pricing from availability schedules (product details doesn't include pricing)
        let pricingFromSchedule = null;
        try {
          pricingFromSchedule = await viatorService.getProductPricing(productCode);
          console.log(`Product ${productCode} pricing from schedule:`, pricingFromSchedule);
        } catch (pricingError) {
          console.log(`Could not fetch pricing for ${productCode}:`, pricingError.message);
        }
        
        if (pricingFromSchedule && pricingFromSchedule > 0) {
          viatorProduct.fromPrice = pricingFromSchedule;
        }
        
        const experience = transformViatorToExperience(viatorProduct);
        
        if (!experience.coverImage || experience.coverImage === '/images/default-experience.jpg') {
          results.failed.push({ 
            productCode, 
            reason: 'Tour has no valid images' 
          });
          continue;
        }
        
        if (!experience.averageRating || experience.averageRating === 0) {
          results.failed.push({ 
            productCode, 
            reason: 'Tour has no ratings yet' 
          });
          continue;
        }
        
        if (!experience.priceFrom || experience.priceFrom === 0) {
          results.failed.push({ 
            productCode, 
            reason: 'Tour has no valid price' 
          });
          continue;
        }
        
        await Experience.create(experience);
        
        results.added.push({
          productCode,
          title: experience.title,
          slug: experience.slug
        });
        
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.error(`Error adding product ${productCode}:`, error);
        results.failed.push({ 
          productCode, 
          reason: error.message || 'Failed to fetch from Viator' 
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Added ${results.added.length} tours, ${results.skipped.length} skipped, ${results.failed.length} failed`,
      results
    });
    
  } catch (error) {
    console.error('Error adding tours:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add tours' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDB();
    
    const { productCodes } = await request.json();
    
    if (!productCodes || !Array.isArray(productCodes) || productCodes.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Product codes array is required' },
        { status: 400 }
      );
    }
    
    const cleanCodes = productCodes
      .map(code => code.trim().toUpperCase())
      .filter(code => code.length > 0);
    
    const results = {
      deleted: [],
      notFound: []
    };
    
    for (const productCode of cleanCodes) {
      const result = await Experience.findOneAndDelete({ 
        slug: { $regex: productCode, $options: 'i' } 
      });
      
      if (result) {
        results.deleted.push({
          productCode,
          title: result.title,
          slug: result.slug
        });
      } else {
        results.notFound.push({ productCode });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Deleted ${results.deleted.length} tours, ${results.notFound.length} not found`,
      results
    });
    
  } catch (error) {
    console.error('Error deleting tours:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete tours' },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectToDB();
    
    const { productCodes, refreshAll } = await request.json();
    
    let toursToRefresh = [];
    
    if (refreshAll) {
      toursToRefresh = await Experience.find({ affiliatePartner: 'Viator' })
        .select('slug')
        .lean();
    } else if (productCodes && Array.isArray(productCodes)) {
      const cleanCodes = productCodes
        .map(code => code.trim().toUpperCase())
        .filter(code => code.length > 0);
      
      for (const code of cleanCodes) {
        const tour = await Experience.findOne({ 
          slug: { $regex: code, $options: 'i' } 
        }).select('slug').lean();
        if (tour) toursToRefresh.push(tour);
      }
    }
    
    if (toursToRefresh.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No tours found to refresh' },
        { status: 400 }
      );
    }
    
    const results = {
      updated: [],
      failed: [],
      removed: []
    };
    
    for (const tour of toursToRefresh) {
      const productCode = tour.slug?.split('-').pop()?.toUpperCase();
      if (!productCode) {
        results.failed.push({ productCode: 'unknown', reason: 'Invalid slug format' });
        continue;
      }
      
      try {
        const viatorProduct = await viatorService.getProductDetails(productCode);
        
        if (!viatorProduct || viatorProduct.status === 'INACTIVE') {
          await Experience.deleteOne({ slug: tour.slug });
          results.removed.push({ productCode, reason: 'No longer available on Viator' });
          continue;
        }
        
        const existingTour = await Experience.findOne({ slug: tour.slug }).lean();
        
        // Try to get pricing from availability schedules (more reliable)
        let pricingFromSchedule = null;
        try {
          pricingFromSchedule = await viatorService.getProductPricing(productCode);
        } catch (pricingError) {
          console.log(`Could not fetch pricing for ${productCode}:`, pricingError.message);
        }
        
        viatorProduct._country = existingTour?.country?.toLowerCase() || detectCountry(viatorProduct);
        viatorProduct._destinationName = existingTour?.city || viatorProduct.destination?.destinationName || 'Unknown';
        
        // Pass pricing from schedule if available, otherwise pass existing price as fallback
        if (pricingFromSchedule && pricingFromSchedule > 0) {
          viatorProduct.fromPrice = pricingFromSchedule;
        } else if (existingTour?.priceFrom && existingTour.priceFrom > 0) {
          viatorProduct._existingPrice = existingTour.priceFrom;
        }
        
        const experience = transformViatorToExperience(viatorProduct);
        
        experience.slug = tour.slug;
        
        // Only update price if we got a valid new price, otherwise keep existing
        const newPrice = experience.priceFrom > 0 ? experience.priceFrom : (existingTour?.priceFrom || 0);
        
        await Experience.updateOne(
          { slug: tour.slug },
          { $set: {
            averageRating: experience.averageRating,
            totalReviews: experience.totalReviews,
            priceFrom: newPrice,
            pricingType: experience.pricingType,
            maxGroupSize: experience.maxGroupSize,
            images: experience.images,
            coverImage: experience.coverImage,
            description: experience.description,
            longDescription: experience.longDescription,
            highlights: experience.highlights,
            inclusions: experience.inclusions,
            exclusions: experience.exclusions,
            itinerary: experience.itinerary,
            cancellationPolicy: experience.cancellationPolicy,
            affiliateLink: experience.affiliateLink,
            duration: experience.duration
          }}
        );
        
        results.updated.push({
          productCode,
          title: experience.title,
          rating: experience.averageRating,
          price: newPrice
        });
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
      } catch (error) {
        console.error(`Error refreshing product ${productCode}:`, error);
        results.failed.push({ 
          productCode, 
          reason: error.message || 'Failed to fetch from Viator' 
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Updated ${results.updated.length} tours, ${results.removed.length} removed, ${results.failed.length} failed`,
      results
    });
    
  } catch (error) {
    console.error('Error refreshing tours:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to refresh tours' },
      { status: 500 }
    );
  }
}

function detectCountry(viatorProduct) {
  const destinationName = viatorProduct.destination?.destinationName?.toLowerCase() || '';
  const title = viatorProduct.title?.toLowerCase() || '';
  const description = viatorProduct.description?.toLowerCase() || '';
  
  const text = `${destinationName} ${title} ${description}`;
  
  if (text.includes('norway') || text.includes('oslo') || text.includes('bergen') || 
      text.includes('tromsø') || text.includes('tromso') || text.includes('trondheim') ||
      text.includes('norwegian') || text.includes('fjord')) {
    return 'norway';
  }
  if (text.includes('iceland') || text.includes('reykjavik') || text.includes('akureyri') ||
      text.includes('icelandic')) {
    return 'iceland';
  }
  if (text.includes('sweden') || text.includes('stockholm') || text.includes('gothenburg') ||
      text.includes('swedish')) {
    return 'sweden';
  }
  if (text.includes('finland') || text.includes('helsinki') || text.includes('rovaniemi') ||
      text.includes('finnish') || text.includes('lapland')) {
    return 'finland';
  }
  if (text.includes('denmark') || text.includes('copenhagen') || text.includes('danish')) {
    return 'denmark';
  }
  
  return 'norway';
}
