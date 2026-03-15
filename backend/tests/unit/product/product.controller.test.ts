import request from 'supertest';
import app from '../../../src/app';
import mongoose from 'mongoose';

import * as productService from '../../../src/products/product.service';
import { buildProduct } from '../../factories/domin/productFactory';
import { toProductResponseDTO } from '../../../src/utils/mappers/product.mapper';

jest.mock('../../../src/products/product.service');
jest.mock('../../../src/suppliers/supplier.model');

// Mock only the startSession method
jest.spyOn(mongoose, 'startSession').mockImplementation(
  () =>
    ({
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: jest.fn(),
    }) as any,
);

const mockProducts = [...Array(2).keys()].map(() => buildProduct());

const mockProductsDto = mockProducts.map((product) =>
  toProductResponseDTO(product),
);

describe('Product Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('GET / should return a list of products', async () => {
      (productService.getAllProducts as jest.Mock).mockResolvedValue(
        mockProducts,
      );
      const response = await request(app).get('/api/v1/products');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data).toEqual(mockProductsDto);
    });

    it('GET / should handle errors', async () => {
      (productService.getAllProducts as jest.Mock).mockRejectedValue(
        new Error('No products found'),
      );
      const response = await request(app).get('/api/v1/products');
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('No products found');
    });
  });

  describe('getProduct', () => {
    it('GET / should return an existing product', async () => {
      (productService.getProduct as jest.Mock).mockResolvedValue(
        mockProducts[0],
      );
      const response = await request(app).get(
        `/api/v1/products/${mockProducts[0]._id}`,
      );
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockProductsDto[0]);
    });

    it('GET / should return a 404 if product does not exist', async () => {
      (productService.getProduct as jest.Mock).mockResolvedValue(null);
      const response = await request(app).get('/api/v1/products/2343232342');
      expect(response.status).toBe(404);
      expect(response.body.status).toBe('fail');
    });

    it('GET / should handle errors', async () => {
      (productService.getProduct as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );
      const response = await request(app).get('/api/v1/products/2343232342');
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database error');
    });
  });

  describe('searchProducts', () => {
    it('GET / find a product based on search criteria', async () => {
      (productService.searchProducts as jest.Mock).mockResolvedValue(
        mockProducts,
      );
      const response = await request(app).get(
        '/api/v1/products/search?name=Test',
      );
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('GET / should handle errors', async () => {
      (productService.searchProducts as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );
      const response = await request(app).get(
        '/api/v1/products/search?name=Test',
      );
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database error');
    });

    it('GET / should handle multiple search parameters', async () => {
      (productService.searchProducts as jest.Mock).mockResolvedValue([
        mockProducts[0],
      ]);
      const response = await request(app).get(
        '/api/v1/products/search?name=Test&barcode=123456789&supplier=SupplierName&sortBy=name&category=Fruit&order=desc',
      );
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([mockProductsDto[0]]);
      expect(productService.searchProducts).toHaveBeenCalledWith(
        'Test',
        '123456789',
        'SupplierName',
        'name',
        'Fruit',
        'desc',
      );
    });
  });

  describe('createProduct', () => {
    it('POST / should add a new valid product', async () => {
      (productService.createProduct as jest.Mock).mockResolvedValue(
        mockProducts[0],
      );
      const response = await request(app)
        .post('/api/v1/products')
        .send(mockProducts[0]);
      expect(response.status).toBe(201);
      expect(response.body.data).toEqual(mockProductsDto[0]);
    });

    it('POST / should not add an invalid product', async () => {
      const validationError = new Error(
        'Validation Error',
      ) as mongoose.Error.ValidationError;
      validationError.name = 'ValidationError';
      validationError.errors = {
        name: {
          name: 'ValidatorError',
          message: 'Name is required',
          kind: 'required',
          path: 'name',
          properties: {
            message: 'Please provide a valid name',
            type: 'invalid',
            path: 'name',
          },
          value: undefined,
        },
        idOrBarcode: {
          message: 'Barcode is required',
          kind: 'required',
          path: 'idOrBarcode',
          name: 'ValidatorError',
          properties: {
            message: 'Please provide a valid id or barcode',
            type: 'invalid',
            path: 'idOrBarcode',
          },
          value: undefined,
        },
      };
      (productService.createProduct as jest.Mock).mockRejectedValue(
        validationError,
      );
      const response = await request(app).post('/api/v1/products').send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Invalid input');
    });

    it('POST / should handle server errors', async () => {
      (productService.createProduct as jest.Mock).mockRejectedValue(
        new Error(''),
      );
      const validProductData = mockProducts[0];
      const response = await request(app)
        .post('/api/v1/products')
        .send(validProductData);
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Failed to create product');
    });
  });

  describe('updateProduct', () => {
    it('PUT / should update an existing product with valid data', async () => {
      (productService.updateProduct as jest.Mock).mockResolvedValue({
        ...mockProducts[1],
        name: 'updated Name',
      });

      const response = await request(app)
        .put('/api/v1/products/507f1f77bcf86cd799439012')
        .send({ name: 'updated Name' });
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual({
        ...mockProductsDto[1],
        name: 'updated Name',
      });
    });

    it('PUT / should return a 404 if product does not exist', async () => {
      (productService.updateProduct as jest.Mock).mockResolvedValue(null);
      const response = await request(app)
        .put(`/api/v1/products/${mockProducts[1]._id}`)
        .send({ name: 'updated Name' });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        `Product with ID ${mockProducts[1]._id} not found`,
      );
    });

    it('PUT / should handle validation errors during update', async () => {
      const validationError = new Error(
        'Validation Error',
      ) as mongoose.Error.ValidationError;
      validationError.name = 'ValidationError';
      validationError.errors = {
        price: {
          message: 'Please provide a valid price',
          kind: 'invalid',
          path: 'price',
          name: 'ValidatorError',
          properties: {
            message: 'Price must be a positive number',
            type: 'min',
          },
          value: undefined,
        },
      };
      (productService.updateProduct as jest.Mock).mockRejectedValue(
        validationError,
      );
      const invalidUpdateData = { price: -1 };
      const response = await request(app)
        .put(`/api/v1/products/${mockProducts[0]._id}`)
        .send(invalidUpdateData);
      expect(response.status).toBe(400);

      expect(response.body.status).toBe(false);
    });
    //  TODO: For branches
    // it('PUT / should handle partial updates correctly', async () => {
    //   const partiallyUpdatedProduct = {
    //     ...mockProducts[0],
    //     quantityInStock: 200,
    //   };
    //   (productService.updateProduct as jest.Mock).mockResolvedValue(
    //     partiallyUpdatedProduct,
    //   );
    //   const partialUpdateData = { quantityInStock: 200 };
    //   const response = await request(app)
    //     .put(`/api/v1/products/${mockProducts[0]._id}`)
    //     .send(partialUpdateData);
    //   expect(response.status).toBe(200);
    //   expect(response.body.data.quantityInStock).toBe(200);
    // });
  });

  describe('deleteProduct', () => {
    it('DELETE / should delete an existing product', async () => {
      (productService.deleteProduct as jest.Mock).mockResolvedValue(
        mockProducts[0],
      );
      const response = await request(app).delete(
        `/api/v1/products/${mockProducts[0]._id}`,
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product deleted successfully');
    });

    it('DELETE / should return 404 if product not found', async () => {
      (productService.deleteProduct as jest.Mock).mockResolvedValue(null);
      const response = await request(app).delete(
        `/api/v1/products/${mockProducts[0]._id}`,
      );
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        `Product with ID ${mockProducts[0]._id} not found`,
      );
    });
  });

  describe('bulkUpdateProducts', () => {
    it('POST / should bulk update products', async () => {
      (productService.bulkUpdateProducts as jest.Mock).mockResolvedValue([
        mockProducts[0],
        mockProducts[1],
      ]);
      const response = await request(app)
        .post('/api/v1/products/bulk-update')
        .send({
          updates: [{ id: mockProducts[0]._id, data: { price: 4.99 } }],
        });
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('getProductCount', () => {
    it('GET / should return product count', async () => {
      (productService.getProductCount as jest.Mock).mockResolvedValue(2);
      const response = await request(app).get('/api/v1/products/stats/count');
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(2);
    });
  });

  describe('getProductsInStock', () => {
    it('GET / should return products in stock', async () => {
      (productService.getProductsInStock as jest.Mock).mockResolvedValue([
        mockProducts[0],
      ]);
      const response = await request(app).get('/api/v1/products/stock/in');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('getProductsOutOfStock', () => {
    it('GET / should return products out of stock', async () => {
      (productService.getProductsOutOfStock as jest.Mock).mockResolvedValue([]);
      const response = await request(app).get('/api/v1/products/stock/out');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('getProductsByPriceRange', () => {
    it('GET / should return products in price range', async () => {
      (productService.getProductsByPriceRange as jest.Mock).mockResolvedValue([
        mockProducts[1],
      ]);
      const response = await request(app).get(
        '/api/v1/products/price-range?minPrice=1&maxPrice=5',
      );
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  // TODO : Move to branch
  // describe('updateProductStock', () => {
  //   it('PATCH / should update product stock', async () => {
  //     const updatedStockProduct = { ...mockProducts[0], quantityInStock: 50 };
  //     (productService.updateProductStock as jest.Mock).mockResolvedValue(
  //       updatedStockProduct,
  //     );
  //     const response = await request(app)
  //       .patch(`/api/v1/products/${mockProducts[0]._id}/stock`)
  //       .send({ quantity: 50 });
  //     expect(response.status).toBe(200);
  //     expect(response.body.data.quantityInStock).toBe(50);
  //   });
  // });
});
