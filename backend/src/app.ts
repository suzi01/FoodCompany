import cors from 'cors';
import express from 'express';
import branchRouter from './branches/branch.routes';
import config from './config/env.config';
import { connectToDB } from './config/mongoose.config';
import { globalErrorHandler } from './error/error.controller';
import productRouter from './products/product.routes';
import supplierRouter from './suppliers/supplier.routes';
import { HttpError } from './utils/app-error';
import { MorganMiddleware as morganMiddleware } from './middlewares/morgan-middleware';
import { Logger as logger } from './utils/logger';

const app = express();
app.use(cors());

app.use(morganMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/products', productRouter);
app.use('/api/v1/suppliers', supplierRouter);
app.use('/api/v1/branches', branchRouter);

app.use('/', (_req, res) => {
  res.send('Welcome to the API');
});

app.all(/.*/, (req, _res, next) => {
  next(new HttpError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

// Start server with proper database connection
const startServer = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      logger.info('Attempting to connect to MongoDB...');
      await connectToDB();
      logger.info('MongoDB connection established successfully');
    }

    app.listen(config.port, () => {
      logger.info(`🚀 Server running on http://localhost:${config.port}`);
    });
  } catch (err) {
    logger.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
