import request from 'supertest';
import app from '../../../src/app';

import * as productService from '../../../src/products/product.service';

jest.mock('../../../src/products/product.service');

const mockProducts = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test Product',
    idOrBarcode: '123456789',
    category: 'Fruit',
    supplier: '507f191e810c19729de860ea',
    price: 2.99,
    quantityInStock: 100,
    description: 'A test product',
    createdAt: new Date('2025-09-24T11:29:40.851Z'),
    updatedAt: new Date('2025-09-24T11:36:17.456Z'),
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Another Product',
    idOrBarcode: '987654321',
    category: 'Fruit',
    supplier: '507f191e810c19729de860eb',
    price: 5.99,
    quantityInStock: 50,
    description: 'Another test product',
    createdAt: new Date('2025-10-24T11:29:40.851Z'),
    updatedAt: new Date('2025-10-24T11:36:17.456Z'),
  },
];

const mockProductsDto = [
  {
    id: '507f1f77bcf86cd799439011',
    name: 'Test Product',
    idOrBarcode: '123456789',
    category: 'Fruit',
    supplier: '507f191e810c19729de860ea',
    price: 2.99,
    quantityInStock: 100,
    description: 'A test product',
    createdAt: '2025-09-24T11:29:40.851Z',
    updatedAt: '2025-09-24T11:36:17.456Z',
  },
  {
    id: '507f1f77bcf86cd799439012',
    name: 'Another Product',
    idOrBarcode: '987654321',
    category: 'Fruit',
    supplier: '507f191e810c19729de860eb',
    price: 5.99,
    quantityInStock: 50,
    description: 'Another test product',
    createdAt: '2025-10-24T11:29:40.851Z',
    updatedAt: '2025-10-24T11:36:17.456Z',
  },
];

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
        '/api/v1/products/search?name=Test&barcode=Fruit&sortBy=name&order=desc',
      );
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([mockProductsDto[0]]);
      expect(productService.searchProducts).toHaveBeenCalledWith(
        'Test',
        'Fruit',
        '',
        'name',
        '',
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
      const validationError = new Error('Validation Error');
      (validationError as any).name = 'ValidationError';
      (validationError as any).errors = {
        name: {
          message: 'Name is required',
          kind: 'required',
          path: 'name',
        },
        idOrBarcode: {
          message: 'Barcode is required',
          kind: 'required',
          path: 'idOrBarcode',
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
        new Error('Database connection failed'),
      );
      const validProductData = mockProducts[0];
      const response = await request(app)
        .post('/api/v1/products')
        .send(validProductData);
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database connection failed');
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
      const validationError = new Error('Validation Error');
      (validationError as any).name = 'ValidationError';
      (validationError as any).errors = {
        price: {
          message: 'Please provide a valid price',
          kind: 'invalid',
          path: 'price',
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

    it('PUT / should handle partial updates correctly', async () => {
      const partiallyUpdatedProduct = {
        ...mockProducts[0],
        quantityInStock: 200,
      };
      (productService.updateProduct as jest.Mock).mockResolvedValue(
        partiallyUpdatedProduct,
      );
      const partialUpdateData = { quantityInStock: 200 };
      const response = await request(app)
        .put(`/api/v1/products/${mockProducts[0]._id}`)
        .send(partialUpdateData);
      expect(response.status).toBe(200);
      expect(response.body.data.quantityInStock).toBe(200);
    });
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

  describe('updateProductStock', () => {
    it('PATCH / should update product stock', async () => {
      const updatedStockProduct = { ...mockProducts[0], quantityInStock: 50 };
      (productService.updateProductStock as jest.Mock).mockResolvedValue(
        updatedStockProduct,
      );
      const response = await request(app)
        .patch(`/api/v1/products/${mockProducts[0]._id}/stock`)
        .send({ quantity: 50 });
      expect(response.status).toBe(200);
      expect(response.body.data.quantityInStock).toBe(50);
    });
  });
});
