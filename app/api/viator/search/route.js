import { NextResponse } from 'next/server';
import { Experience } from '@/lib/db/models';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const country = searchParams.get('country');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Search query must be at least 2 characters'
      }, { status: 400 });
    }

    const searchTerm = query.trim();
    
    const searchQuery = {
      isActive: true,
      affiliatePartner: 'Viator',
      coverImage: { $exists: true, $ne: null, $ne: '' },
      $and: [
        {
          $or: [
            { averageRating: { $exists: true, $gt: 0 } },
            { rating: { $exists: true, $gt: 0 } }
          ]
        },
        {
          $or: [
            { priceFrom: { $exists: true, $gt: 0 } },
            { price: { $exists: true, $gt: 0 } }
          ]
        },
        {
          $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } },
            { city: { $regex: searchTerm, $options: 'i' } },
            { tags: { $in: [new RegExp(searchTerm, 'i')] } }
          ]
        }
      ]
    };

    if (country) {
      searchQuery.country = { $regex: country, $options: 'i' };
    }

    const experiences = await Experience.find(searchQuery)
      .select('title slug coverImage priceFrom averageRating totalReviews country city category duration')
      .sort({ averageRating: -1, totalReviews: -1 })
      .limit(limit)
      .lean();

    const results = experiences.map(exp => ({
      id: exp._id.toString(),
      slug: exp.slug,
      title: exp.title,
      image: exp.coverImage,
      price: exp.priceFrom,
      rating: exp.averageRating,
      reviews: exp.totalReviews,
      country: exp.country,
      city: exp.city,
      category: exp.category,
      duration: exp.duration
    }));

    return NextResponse.json({
      success: true,
      query: searchTerm,
      products: results,
      totalFound: results.length
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to search experiences'
    }, { status: 500 });
  }
}
