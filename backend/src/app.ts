import express from 'express';
import cors from 'cors';
import config from './config/env.config';
import { connectToDB } from './config/mongoose.config';
import supplierRouter from './suppliers/supplier.routes';
import { globalErrorHandler } from './error/error.controller';
import { HttpError } from './utils/app-error';
import branchRouter from './branches/branch.routes';
import productRouter from './products/product.routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToDB()
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection failed', err));

app.use('/api/v1/products', productRouter);
app.use('/api/v1/suppliers', supplierRouter);
app.use('/api/v1/branches', branchRouter);

app.use('/', (_req, res) => {
  res.send('Welcome to the API');
});

app.use('/api/test', (_req, res, next) => {
  try {
    console.log('➡️ Connecting to DB...');
    connectToDB();
    console.log('✅ DB connected, sending response');
    res.json({ success: true });
  } catch (err) {
    console.error('❌ DB connect failed', err);
    next(err);
  }
});

app.all(/.*/, (req, _res, next) => {
  next(new HttpError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

// app.listen(config.port, async () => {
//   console.log(`🚀 Server running on http://localhost:${config.port}`);
//   if (process.env.NODE_ENV !== 'test') {
//     console.log('🌱 Connecting to MongoDB...');
//     await connectToDB();
//   }
// });

export default app;
