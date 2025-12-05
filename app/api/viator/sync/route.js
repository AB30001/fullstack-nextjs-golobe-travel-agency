import { NextResponse } from 'next/server';
import { viatorService } from '@/lib/services/viator';
import { Experience } from '@/lib/db/models';
import { transformViatorProduct } from '@/lib/services/viatorTransformer';

export async function POST(request) {
  const startTime = Date.now();
  
  try {
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.API_SECRET_TOKEN;
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[Sync] Starting sync...');

    const existingExperiences = await Experience.find({}, { productCode: 1 }).lean();
    const productCodes = existingExperiences.map(e => e.productCode).filter(Boolean);
    console.log(`[Sync] Found ${productCodes.length} products to check for updates`);

    if (productCodes.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No products to sync',
        updated: 0,
        duration: Date.now() - startTime
      });
    }

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    console.log(`[Sync] Checking for products modified since: ${oneDayAgo}`);

    let modifiedProducts = [];
    try {
      modifiedProducts = await viatorService.updateModifiedProducts(productCodes, oneDayAgo);
      console.log(`[Sync] Found ${modifiedProducts.length} modified products in our catalog`);
    } catch (apiError) {
      console.error('[Sync] Failed to fetch modified products from Viator:', apiError.message);
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch modified products from Viator API',
        details: apiError.message,
        duration: Date.now() - startTime
      }, { status: 502 });
    }

    if (modifiedProducts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No products were modified in the last 24 hours',
        checked: productCodes.length,
        modified: 0,
        updated: 0,
        duration: Date.now() - startTime
      });
    }

    let updatedCount = 0;
    const errors = [];
    
    for (const product of modifiedProducts) {
      try {
        const experience = await Experience.findOne({ productCode: product.productCode });
        if (experience) {
          const transformed = transformViatorProduct(product);
          
          await Experience.updateOne(
            { productCode: product.productCode },
            {
              $set: {
                priceFrom: transformed.priceFrom,
                title: transformed.title,
                description: transformed.description,
                highlights: transformed.highlights,
                included: transformed.included,
                notIncluded: transformed.notIncluded,
                images: transformed.images,
                duration: transformed.duration,
                averageRating: transformed.averageRating,
                totalReviews: transformed.totalReviews,
                updatedAt: new Date()
              }
            }
          );
          updatedCount++;
          console.log(`[Sync] Updated: ${product.productCode}`);
        }
      } catch (err) {
        console.error(`[Sync] Error updating ${product.productCode}:`, err.message);
        errors.push({ productCode: product.productCode, error: err.message });
      }
    }

    console.log(`[Sync] Completed: ${updatedCount} products updated, ${errors.length} errors`);

    return NextResponse.json({
      success: true,
      message: `Sync completed successfully`,
      checked: productCodes.length,
      modified: modifiedProducts.length,
      updated: updatedCount,
      errors: errors.length > 0 ? errors : undefined,
      duration: Date.now() - startTime
    });

  } catch (error) {
    console.error('[Sync] Critical error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to sync products',
      details: error.message,
      duration: Date.now() - startTime
    }, { status: 500 });
  }
}

export async function GET(request) {
  return NextResponse.json({
    endpoint: '/api/viator/sync',
    method: 'POST',
    description: 'Syncs modified products from Viator API (checks last 24 hours)',
    auth: 'Bearer token required (API_SECRET_TOKEN)',
    usage: 'Call this endpoint periodically (e.g., daily via cron) to keep product data fresh',
    response: {
      success: 'boolean',
      checked: 'number of products in database',
      modified: 'number of products modified on Viator',
      updated: 'number of products successfully updated',
      duration: 'milliseconds taken'
    }
  });
}
