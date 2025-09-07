import { connect, set } from 'mongoose';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production.local' 
  : '.env.development.local';

dotenv.config({ path: envFile });


const MONGO_DB_URI = process.env.MONGO_DB_URI;


export const connectToDB = async () => {
  try {
    if (!MONGO_DB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local')
    }
    set('strictQuery', false);
    const db = await connect(MONGO_DB_URI);
    console.log('MongoDB connected to', db.connection.name);

  } catch (error) {
    console.error(error);
    process.exit(1)
  }
};