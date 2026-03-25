import dotenv from 'dotenv';
import fs from 'fs';
import { Logger as logger } from '../utils/logger';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production.local'
    : '.env.development.local';

// Only load .env files if they exist (for local dev)
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  logger.info(`✅ Loaded environment from ${envFile}`);
} else {
  logger.warn(
    '⚠️ No local .env file found. Assuming environment variables are injected (e.g. on Vercel).',
  );
}

interface Config {
  port: number;
  nodeEnv: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;
