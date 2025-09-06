import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production.local' 
  : '.env.development.local';

dotenv.config({ path: envFile });


interface Config {
    port: number;
    nodeEnv: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
};

export default config;