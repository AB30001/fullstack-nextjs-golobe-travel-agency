import { NextResponse } from 'next/server';
import { viatorService } from '@/lib/services/viator';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productCode = searchParams.get('productCode');
    const date = searchParams.get('date');
    const travelers = searchParams.get('travelers');

    if (!productCode) {
      return NextResponse.json(
        { error: 'Product code is required' },
        { status: 400 }
      );
    }

    const availability = await viatorService.getAvailabilitySchedule(productCode, date, travelers);

    return NextResponse.json({ success: true, availability });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch availability',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
