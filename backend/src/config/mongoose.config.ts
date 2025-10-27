import mongoose, { connect, set } from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production.local'
    : '.env.development.local';

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log(`✅ Loaded environment from ${envFile}`);
} else {
  console.log(
    '⚠️ No local .env file found. Assuming environment variables are injected (e.g. on Vercel).',
  );
}

console.log('MONGO URI exists:', !!process.env.MONGO_DB_URI);
mongoose.connection.on('connected', () =>
  console.log('✅ Connected to Mongo Yay'),
);
mongoose.connection.on('error', (err) => console.error('❌ Mongo error:', err));

const MONGO_DB_URI = process.env.MONGO_DB_URI;

export const connectToDB = async () => {
  console.log('Starting MongoDB connection...');
  try {
    if (!MONGO_DB_URI) {
      console.log('❌ MONGODB_URI is not defined');
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.<development/production>.local',
      );
    }
    set('strictQuery', false);
    const db = await connect(MONGO_DB_URI);
    console.log('MongoDB connected to', db.connection.name);
  } catch (error) {
    console.log('❌ MongoDB connection failed');
    console.error(error);
    process.exit(1);
  }
};
