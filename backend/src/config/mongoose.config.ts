import mongoose, { connect, set } from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import { Logger as logger } from '../utils/logger';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production.local'
    : '.env.development.local';

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  logger.info(`✅ Loaded environment from ${envFile}`);
} else {
  logger.warn(
    '⚠️ No local .env file found. Assuming environment variables are injected (e.g. on Vercel).',
  );
}

logger.info('MONGO URI exists:', !!process.env.MONGO_DB_URI);
mongoose.connection.on('connected', () =>
  logger.info('✅ Connected to Mongo Yay'),
);
mongoose.connection.on('error', (err) => logger.error('❌ Mongo error:', err));

const MONGO_DB_URI = process.env.MONGO_DB_URI;

export const connectToDB = async () => {
  logger.info('Starting MongoDB connection...');
  try {
    if (!MONGO_DB_URI) {
      logger.error('❌ MONGODB_URI is not defined');
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.<development/production>.local',
      );
    }
    set('strictQuery', false);
    const db = await connect(MONGO_DB_URI);
    logger.info('MongoDB connected to database with name', db.connection.name);
  } catch (error) {
    logger.error('❌ MongoDB connection failed');
    logger.error(error);
    process.exit(1);
  }
};
