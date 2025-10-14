import { Router } from 'express';
import { validateSchema } from '../middlewares/validate-schema.middleware';
import { createProductSchema } from './dtos/create-product.dto';
import { editProductSchema } from './dtos/edit-product.dto';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  searchProducts,
  updateProduct,
  getProductsByPriceRange,
  getProductsInStock,
  getProductsOutOfStock,
  updateProductStock,
  bulkUpdateProducts,
  getProductCount,
  getProductCountByCategory,
} from './product.controller';

const productRouter = Router();

productRouter.post('/', validateSchema(createProductSchema), createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/search', searchProducts);

productRouter.put('/:id', validateSchema(editProductSchema), updateProduct);
productRouter.delete('/:id', deleteProduct);

// Additional routes for extended service methods
productRouter.get('/stats/count', getProductCount);
productRouter.get('/stats/category-count', getProductCountByCategory);
productRouter.get('/stock/in', getProductsInStock);
productRouter.get('/stock/out', getProductsOutOfStock);
productRouter.patch('/:id/stock', updateProductStock);
productRouter.post('/bulk-update', bulkUpdateProducts);
productRouter.get('/price-range', getProductsByPriceRange);

productRouter.get('/:id', getProduct);
export default productRouter;
