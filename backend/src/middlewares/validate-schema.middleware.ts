import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodType } from 'zod';

export const validateSchema =
  (schema: ZodType<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const zodError = result.error as ZodError;
      const errors = zodError.issues
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ');

      return res.status(400).json({
        status: false,
        message: errors,
      });
    }

    req.body = result.data;
    next();
  };
