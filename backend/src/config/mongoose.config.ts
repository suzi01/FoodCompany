import mongoose, { set, connect, Connection } from 'mongoose';

let cachedDb: Connection | null = null;

const MONGO_DB_URI = process.env.MONGO_DB_URI;

export const connectToDB = async (): Promise<Connection> => {
  if (cachedDb) {
    console.log('✅ Reusing cached MongoDB connection.');
    return cachedDb;
  }

  if (!MONGO_DB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable.');
  }

  console.log('Starting NEW MongoDB connection...');
  try {
    set('strictQuery', false);
    const db = await connect(MONGO_DB_URI);

    cachedDb = db.connection;
    console.log('MongoDB connection established.');
    return cachedDb;
  } catch (error) {
    console.log('❌ MongoDB connection failed');
    throw error;
  }
};
