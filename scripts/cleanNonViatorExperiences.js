import { connectToDB } from '../lib/db/utilsDB.js';
import { Experience } from '../lib/db/models/index.js';

async function cleanNonViatorExperiences() {
  try {
    await connectToDB();
    
    // Find all non-Viator experiences
    const nonViatorExperiences = await Experience.find({
      affiliatePartner: { $ne: 'Viator' }
    });
    
    console.log(`Found ${nonViatorExperiences.length} non-Viator experiences to delete`);
    
    // Delete all non-Viator experiences
    const result = await Experience.deleteMany({
      affiliatePartner: { $ne: 'Viator' }
    });
    
    console.log(`Successfully deleted ${result.deletedCount} non-Viator experiences`);
    
    // Count remaining Viator experiences
    const viatorCount = await Experience.countDocuments({
      affiliatePartner: 'Viator'
    });
    
    console.log(`Remaining Viator experiences: ${viatorCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error cleaning non-Viator experiences:', error);
    process.exit(1);
  }
}

cleanNonViatorExperiences();
