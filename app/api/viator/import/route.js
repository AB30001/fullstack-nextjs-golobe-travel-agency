import { NextResponse } from 'next/server';
import { getOperationDB } from '@/lib/db/getOperationDB';
import { Experience } from '@/lib/db/models';
import { viatorService } from '@/lib/services/viator';
import { transformMultipleViatorProducts } from '@/lib/services/viatorTransformer';

export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.API_SECRET_TOKEN}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await getOperationDB();

    const body = await request.json();
    const { maxPerCountry = 50, clearExisting = false } = body;

    if (clearExisting) {
      await Experience.deleteMany({ affiliatePartner: 'Viator' });
      console.log('Cleared existing Viator experiences');
    }

    console.log('Fetching Nordic products from Viator...');
    const viatorProducts = await viatorService.getAllNordicProducts(maxPerCountry);
    console.log(`Fetched ${viatorProducts.length} products from Viator`);

    const transformedExperiences = transformMultipleViatorProducts(viatorProducts);
    console.log(`Transformed ${transformedExperiences.length} experiences`);

    const results = {
      success: 0,
      failed: 0,
      errors: []
    };

    for (const experience of transformedExperiences) {
      try {
        await Experience.updateOne(
          { slug: experience.slug },
          { $set: experience },
          { upsert: true }
        );
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          slug: experience.slug,
          error: error.message
        });
        console.error(`Error saving experience ${experience.slug}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Imported ${results.success} Viator experiences`,
      stats: {
        totalFetched: viatorProducts.length,
        totalTransformed: transformedExperiences.length,
        saved: results.success,
        failed: results.failed,
        errors: results.errors.slice(0, 10)
      }
    });

  } catch (error) {
    console.error('Error importing Viator tours:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await getOperationDB();
    
    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    if (action === 'destinations') {
      const nordicDestinations = await viatorService.getNordicDestinations();
      return NextResponse.json({
        success: true,
        destinations: nordicDestinations
      });
    }

    if (action === 'preview') {
      const maxPerCountry = parseInt(url.searchParams.get('max') || '10');
      const viatorProducts = await viatorService.getAllNordicProducts(maxPerCountry);
      const transformedExperiences = transformMultipleViatorProducts(viatorProducts);
      
      return NextResponse.json({
        success: true,
        count: transformedExperiences.length,
        preview: transformedExperiences.slice(0, 5),
        summary: {
          byCountry: {
            norway: transformedExperiences.filter(e => e.country === 'Norway').length,
            sweden: transformedExperiences.filter(e => e.country === 'Sweden').length,
            iceland: transformedExperiences.filter(e => e.country === 'Iceland').length,
            denmark: transformedExperiences.filter(e => e.country === 'Denmark').length,
            finland: transformedExperiences.filter(e => e.country === 'Finland').length,
          },
          byCategory: transformedExperiences.reduce((acc, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + 1;
            return acc;
          }, {})
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Viator import API',
      endpoints: {
        'POST /api/viator/import': 'Import Viator tours into database',
        'GET /api/viator/import?action=destinations': 'Get Nordic destinations',
        'GET /api/viator/import?action=preview&max=10': 'Preview Viator data transformation'
      }
    });

  } catch (error) {
    console.error('Error in Viator import GET:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
