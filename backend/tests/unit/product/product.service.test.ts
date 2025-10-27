import Product from '../../../src/products/product.model';
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} from '../../../src/products/product.service';

jest.mock('../../../src/products/product.model');

describe('Product Service', () => {
  const mockProduct = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test Product',
    idOrBarcode: '123456789',
    category: 'Fruit',
    supplier: '507f191e810c19729de860ea',
    price: 2.99,
    quantityInStock: 100,
    description: 'A test product',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('should call Product.create with correct data', async () => {
      const newProduct = {
        name: 'Test Product',
        idOrBarcode: '123456789',
        category: 'Fruit',
        supplier: '507f191e810c19729de860ea',
        price: 2.99,
        quantityInStock: 100,
        description: 'A test product',
      };
      (Product.create as jest.Mock).mockResolvedValue({
        ...newProduct,
        _id: '123',
      });
      const result = await createProduct(newProduct);
      expect(Product.create).toHaveBeenCalledWith(newProduct);
      expect(result.name).toBe('Test Product');
    });
    it('should handle creation errors', async () => {
      const productData = {
        name: 'Error Product',
        idOrBarcode: 'error123',
        category: 'Fruit',
        supplier: '507f191e810c19729de860ea',
        price: 1.99,
        quantityInStock: 10,
        description: 'Error product',
      };
      const error = new Error('Database connection failed');
      (Product.create as jest.Mock).mockRejectedValue(error);
      await expect(createProduct(productData)).rejects.toThrow(
        'Database connection failed',
      );
      expect(Product.create).toHaveBeenCalledWith(productData);
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const products = [
        mockProduct,
        {
          ...mockProduct,
          _id: '507f1f77bcf86cd799439012',
          name: 'Another Product',
        },
      ];
      (Product.find as jest.Mock).mockResolvedValue(products);
      const result = await getAllProducts();
      expect(Product.find).toHaveBeenCalled();
      expect(result).toEqual(products);
    });
    it('should return empty array when no products exist', async () => {
      (Product.find as jest.Mock).mockResolvedValue([]);
      const result = await getAllProducts();
      expect(Product.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
    it('should handle database errors', async () => {
      const error = new Error('Database query failed');
      (Product.find as jest.Mock).mockRejectedValue(error);
      await expect(getAllProducts()).rejects.toThrow('Database query failed');
      expect(Product.find).toHaveBeenCalled();
    });
  });

  describe('getProduct', () => {
    it('should return product', async () => {
      (Product.findById as jest.Mock).mockResolvedValue(mockProduct);
      const result = await getProduct('507f1f77bcf86cd799439011');
      expect(Product.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(result).toEqual(mockProduct);
    });
    it('should return null when product does not exist', async () => {
      (Product.findById as jest.Mock).mockResolvedValue(null);
      const result = await getProduct('507f1f77bcf86cd799439099');
      expect(Product.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439099');
      expect(result).toBeNull();
    });
    it('should handle database errors', async () => {
      const error = new Error('Database query failed');
      (Product.findById as jest.Mock).mockRejectedValue(error);
      await expect(getProduct('507f1f77bcf86cd799439011')).rejects.toThrow(
        'Database query failed',
      );
      expect(Product.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    });
  });

  describe('updateProduct', () => {
    const updateData = {
      name: 'Updated Product',
      price: 3.99,
    };
    it('should update product successfully', async () => {
      const updatedProduct = { ...mockProduct, ...updateData };
      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        updatedProduct,
      );
      const result = await updateProduct(
        '507f1f77bcf86cd799439011',
        updateData,
      );
      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateData,
        { new: true },
      );
      expect(result).toBeDefined();
      expect(result).not.toBeNull();
      if (result) {
        expect(result.name).toBe('Updated Product');
        expect(result.price).toBe(3.99);
      }
    });
    it('should return null when no products exist', async () => {
      (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      const result = await updateProduct(
        '507f1f77bcf86cd799439011',
        updateData,
      );
      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateData,
        { new: true },
      );
      expect(result).toBeNull();
    });
    it('should handle database errors', async () => {
      const error = new Error('Database query failed');
      (Product.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);
      await expect(
        updateProduct('507f1f77bcf86cd799439011', updateData),
      ).rejects.toThrow('Database query failed');
      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateData,
        { new: true },
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete product successfully', async () => {
      (Product.findByIdAndDelete as jest.Mock).mockResolvedValue(mockProduct);
      const result = await deleteProduct('507f1f77bcf86cd799439011');
      expect(Product.findByIdAndDelete).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
      expect(result).toEqual(mockProduct);
    });
    it('should return null when deleting non-existent product', async () => {
      (Product.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      const result = await deleteProduct('nonexistent123');
      expect(Product.findByIdAndDelete).toHaveBeenCalledWith('nonexistent123');
      expect(result).toBeNull();
    });
    it('should handle deletion errors', async () => {
      const error = new Error('Deletion failed');
      (Product.findByIdAndDelete as jest.Mock).mockRejectedValue(error);
      await expect(deleteProduct('507f1f77bcf86cd799439011')).rejects.toThrow(
        'Deletion failed',
      );
      expect(Product.findByIdAndDelete).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
    });
  });

  describe('searchProducts', () => {
    const mockSearchResults = [
      mockProduct,
      { ...mockProduct, _id: '507f1f77bcf86cd799439012', name: 'Beta Product' },
    ];
    let mockSort: jest.Mock;
    beforeEach(() => {
      mockSort = jest.fn().mockResolvedValue(mockSearchResults);
      (Product.find as jest.Mock).mockReturnValue({ sort: mockSort });
    });
    it('should search products with all parameters', async () => {
      const result = await searchProducts(
        'Test',
        '',
        '',
        'Fruit',
        'name',
        'asc',
      );
      expect(Product.find).toHaveBeenCalledWith({
        name: { $regex: 'Test', $options: 'i' },
        category: { $regex: 'Fruit', $options: 'i' },
      });
      expect(mockSort).toHaveBeenCalledWith({ name: 1 });
      expect(result).toEqual(mockSearchResults);
    });
    it('should search products with only name', async () => {
      const result = await searchProducts('Test', '', '', '', 'name', 'desc');
      expect(Product.find).toHaveBeenCalledWith({
        name: { $regex: 'Test', $options: 'i' },
      });
      expect(mockSort).toHaveBeenCalledWith({ name: -1 });
      expect(result).toEqual(mockSearchResults);
    });
    it('should handle search errors', async () => {
      const error = new Error('Search failed');
      mockSort.mockRejectedValue(error);
      await expect(
        searchProducts('Test', '', '', 'name', 'asc'),
      ).rejects.toThrow('Search failed');
    });
    it('should handle special regex characters in search terms', async () => {
      await searchProducts(
        'Test.Product',
        'fruit+',
        'ABC[123]',
        '',
        'name',
        'asc',
      );
      expect(Product.find).toHaveBeenCalledWith({
        name: { $regex: 'Test.Product', $options: 'i' },
        barcode: { $regex: 'fruit+', $options: 'i' },
        supplier: { $regex: 'ABC[123]', $options: 'i' },
      });
    });
  });
});
