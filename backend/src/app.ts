import express from 'express';
import config from './config/env.config';
import { connectToDB } from './config/mongoose.config';
import supplierRouter from './suppliers/supplier.routes';
import { globalErrorHandler } from './error/error.controller';
import { HttpError } from './utils/app-error';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/suppliers', supplierRouter);

app.all(/.*/, (req, _res, next) => {
  next(new HttpError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

app.listen(config.port, async () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
  if (process.env.NODE_ENV !== 'test') {
    await connectToDB();
  }
});

export default app;
