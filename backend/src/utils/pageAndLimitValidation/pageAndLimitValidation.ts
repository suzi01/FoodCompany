import { HttpError } from '../app-error';
import { Logger as logger } from '../logger';

export const pageAndLimitValidation = (page: number, limit: number) => {
  if (page < 1 || limit < 1) {
    logger.warn(`Invalid pagination parameters: page=${page}, limit=${limit}`);
    throw new HttpError(400, 'Page and limit must be positive integers');
  }
  if (limit > 20) {
    logger.warn(`Limit exceeds maximum allowed value: limit=${limit}`);
    throw new HttpError(400, 'Limit cannot exceed 20');
  }
};
