import { Router } from 'express';
import { validateSchema } from '../middlewares/validate-schema.middleware';
import { createProductSchema } from './dtos/create-product.dto';
import { editProductSchema } from './dtos/edit-product.dto';
import {
  bulkUpdateProducts,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductCount,
  getProductCountByCategory,
  getProductsByPriceRange,
  getProductsInStock,
  getProductsOutOfStock,
  searchProducts,
  updateProduct,
  updateProductStock,
} from './product.controller';

const productRouter = Router();

productRouter
  .route('/')
  .post(validateSchema(createProductSchema), createProduct)
  .get(getAllProducts);

productRouter.get('/search', searchProducts);

// Additional routes for extended service methods
productRouter.get('/stats/count', getProductCount);
productRouter.get('/stats/category-count', getProductCountByCategory);
productRouter.get('/stock/in', getProductsInStock);
productRouter.get('/stock/out', getProductsOutOfStock);
productRouter.patch('/:id/stock', updateProductStock);
productRouter.post('/bulk-update', bulkUpdateProducts);
productRouter.get('/price-range', getProductsByPriceRange);

productRouter
  .route('/:id')
  .put(validateSchema(editProductSchema), updateProduct)
  .delete(deleteProduct)
  .get(getProduct);

export default productRouter;
