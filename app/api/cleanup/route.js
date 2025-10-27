import { connectToDB } from '@/lib/db/utilsDB';
import { Experience } from '@/lib/db/models/index.js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { secret } = await request.json();
    
    // Verify secret token for security
    if (secret !== process.env.API_SECRET_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await connectToDB();
    
    // Find all non-Viator experiences
    const nonViatorExperiences = await Experience.find({
      affiliatePartner: { $ne: 'Viator' }
    }).lean();
    
    console.log(`Found ${nonViatorExperiences.length} non-Viator experiences to delete`);
    console.log('Non-Viator partners:', [...new Set(nonViatorExperiences.map(e => e.affiliatePartner))]);
    
    // Delete all non-Viator experiences
    const result = await Experience.deleteMany({
      affiliatePartner: { $ne: 'Viator' }
    });
    
    console.log(`Successfully deleted ${result.deletedCount} non-Viator experiences`);
    
    // Count remaining Viator experiences
    const viatorCount = await Experience.countDocuments({
      affiliatePartner: 'Viator',
      isActive: true
    });
    
    console.log(`Remaining Viator experiences: ${viatorCount}`);
    
    return NextResponse.json({
      success: true,
      message: `Deleted ${result.deletedCount} non-Viator experiences`,
      remainingViatorExperiences: viatorCount
    });
  } catch (error) {
    console.error('Error cleaning non-Viator experiences:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
