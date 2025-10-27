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

if (process.env.NODE_ENV !== 'production') {
  console.log('Local development mode detected.');

  connectToDB()
    .then(() => {
      app.listen(config.port, () => {
        console.log(`🚀 Server running on http://localhost:${config.port}`);
      });
    })
    .catch((err) => {
      console.error(
        '❌ Failed to start local server due to MongoDB error:',
        err,
      );
      process.exit(1);
    });
}

export default app;
