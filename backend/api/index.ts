import app from '../src/app';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectToDB } from '../src/config/mongoose.config';
// Use a global variable to track the connection status for Vercel's "warm starts"
declare global {
  var isDbConnected: boolean;
}

// Export the default handler function that Vercel invokes on every request
export default async (req: VercelRequest, res: VercelResponse) => {
  // 1. Connection Check and Caching
  if (!global.isDbConnected) {
    try {
      console.log('--- COLD START --- Initializing DB Connection');
      await connectToDB(); // Connect (or reuse if cached)
      global.isDbConnected = true;
    } catch (error) {
      console.error('❌ CRITICAL: DB connection failed:', error);
      // Respond with a 503 error if the DB is inaccessible
      res.status(503).send('Service Unavailable: Database error.');
      return;
    }
  }

  return app(req, res);
};
