import { NextResponse } from 'next/server';
import { viatorService } from '@/lib/services/viator';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productCode = searchParams.get('productCode');

    if (!productCode) {
      return NextResponse.json(
        { error: 'Product code is required' },
        { status: 400 }
      );
    }

    const availability = await viatorService.getAvailabilitySchedule(productCode);

    return NextResponse.json({ success: true, availability });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch availability',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
