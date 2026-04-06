import { pageAndLimitValidation } from '../../src/utils/pageAndLimitValidation';
import { HttpError } from '../../src/utils/app-error';

describe('pageAndLimitValidation', () => {
  it('should not throw an error for valid page and limit', () => {
    expect(() => pageAndLimitValidation(1, 10)).not.toThrow();
    expect(() => pageAndLimitValidation(5, 20)).not.toThrow();
  });

  it('should throw an error for non-positive page or limit', () => {
    expect(() => pageAndLimitValidation(0, 10)).toThrow(HttpError);
    expect(() => pageAndLimitValidation(1, 0)).toThrow(HttpError);
    expect(() => pageAndLimitValidation(-1, 10)).toThrow(HttpError);
    expect(() => pageAndLimitValidation(1, -10)).toThrow(HttpError);
  });

  it('should throw an error if limit exceeds maximum allowed value', () => {
    expect(() => pageAndLimitValidation(1, 21)).toThrow(HttpError);
    expect(() => pageAndLimitValidation(1, 100)).toThrow(HttpError);
  });
});
