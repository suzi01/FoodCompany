import dotenv from 'dotenv';
import fs from 'fs';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production.local'
    : '.env.development.local';

// Only load .env files if they exist (for local dev)
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log(`✅ Loaded environment from ${envFile}`);
} else {
  console.log(
    '⚠️ No local .env file found. Assuming environment variables are injected (e.g. on Vercel).',
  );
}

console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  hasMongoUri: !!process.env.MONGODB_URI,
});

interface Config {
  port: number;
  nodeEnv: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;
