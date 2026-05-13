import Product from '../../../src/products/product.model';
import Supplier from '../../../src/suppliers/supplier.model';
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByPriceRange,
  getProductsInStock,
  getProductsOutOfStock,
} from '../../../src/products/product.service';
import { buildProduct } from '../../factories/domin/productFactory';

jest.mock('../../../src/products/product.model');
jest.mock('../../../src/suppliers/supplier.model');

describe('Product Service', () => {
  const mockProduct = buildProduct();

  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe('createProduct', () => {
  //   it('should call Product.create with correct data', async () => {
  //     const newProduct = {
  //       name: 'Test Product',
  //       idOrBarcode: '123456789',
  //       category: 'Fruit',
  //       supplier: '507f191e810c19729de860ea',
  //       price: 2.99,
  //       quantityInStock: 100,
  //       description: 'A test product',
  //     };
  //     const createdProduct = {
  //       ...newProduct,
  //       _id: '507f1f77bcf86cd799439011',
  //     };

  //     (Product.create as jest.Mock).mockResolvedValue([createdProduct]);
  //     (Supplier.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

  //     const result = await createProduct(newProduct);

  //     expect(Product.create).toHaveBeenCalledWith([newProduct], {
  //       session: undefined,
  //     });
  //     expect(Supplier.findByIdAndUpdate).toHaveBeenCalledWith(
  //       newProduct.supplier,
  //       { $addToSet: { productsProvided: createdProduct._id } },
  //       { session: undefined },
  //     );
  //     expect(result).toEqual(createdProduct);
  //   });
  //   it('should handle creation errors', async () => {
  //     const productData = {
  //       name: 'Error Product',
  //       idOrBarcode: 'error123',
  //       category: 'Fruit',
  //       supplier: '507f191e810c19729de860ea',
  //       price: 1.99,
  //       quantityInStock: 10,
  //       description: 'Error product',
  //     };
  //     const error = new Error('Database connection failed');
  //     (Product.create as jest.Mock).mockRejectedValue(error);
  //     await expect(createProduct(productData)).rejects.toThrow(
  //       'Database connection failed',
  //     );
  //     expect(Product.create).toHaveBeenCalledWith([productData], {
  //       session: undefined,
  //     });
  //   });
  // });

  // describe('getAllProducts', () => {
  //   it('should return all products with pagination', async () => {
  //     const products = [
  //       mockProduct,
  //       {
  //         ...mockProduct,
  //         _id: '507f1f77bcf86cd799439012',
  //         name: 'Another Product',
  //       },
  //     ];
  //     const mockLimit = jest.fn().mockResolvedValue(products);
  //     const mockSkip = jest.fn().mockReturnValue({ limit: mockLimit });
  //     (Product.find as jest.Mock).mockReturnValue({ skip: mockSkip });
  //     (Product.countDocuments as jest.Mock).mockResolvedValue(2);

  //     const result = await getAllProducts(1, 10);

  //     expect(Product.countDocuments).toHaveBeenCalled();
  //     expect(Product.find).toHaveBeenCalled();
  //     expect(mockSkip).toHaveBeenCalledWith(0);
  //     expect(mockLimit).toHaveBeenCalledWith(10);
  //     expect(result).toEqual({ products, totalDocuments: 2 });
  //   });

  //   it('should return empty array when no products exist', async () => {
  //     const mockLimit = jest.fn().mockResolvedValue([]);
  //     const mockSkip = jest.fn().mockReturnValue({ limit: mockLimit });
  //     (Product.find as jest.Mock).mockReturnValue({ skip: mockSkip });
  //     (Product.countDocuments as jest.Mock).mockResolvedValue(0);

  //     const result = await getAllProducts(1, 10);

  //     expect(result).toEqual({ products: [], totalDocuments: 0 });
  //   });

  //   it('should handle database errors', async () => {
  //     const error = new Error('Database query failed');
  //     (Product.countDocuments as jest.Mock).mockRejectedValue(error);

  //     await expect(getAllProducts(1, 10)).rejects.toThrow(
  //       'Database query failed',
  //     );
  //   });
  // });

  // describe('getProduct', () => {
  //   it('should return product', async () => {
  //     (Product.findById as jest.Mock).mockResolvedValue(mockProduct);
  //     const result = await getProduct('507f1f77bcf86cd799439011');
  //     expect(Product.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
  //     expect(result).toEqual(mockProduct);
  //   });
  //   it('should return null when product does not exist', async () => {
  //     (Product.findById as jest.Mock).mockResolvedValue(null);
  //     const result = await getProduct('507f1f77bcf86cd799439099');
  //     expect(Product.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439099');
  //     expect(result).toBeNull();
  //   });
  //   it('should handle database errors', async () => {
  //     const error = new Error('Database query failed');
  //     (Product.findById as jest.Mock).mockRejectedValue(error);
  //     await expect(getProduct('507f1f77bcf86cd799439011')).rejects.toThrow(
  //       'Database query failed',
  //     );
  //     expect(Product.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
  //   });
  // });

  // describe('updateProduct', () => {
  //   const updateData = {
  //     name: 'Updated Product',
  //     price: 3.99,
  //   };
  //   it('should update product successfully', async () => {
  //     const updatedProduct = { ...mockProduct, ...updateData };
  //     (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(
  //       updatedProduct,
  //     );
  //     const result = await updateProduct(
  //       '507f1f77bcf86cd799439011',
  //       updateData,
  //     );
  //     expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
  //       '507f1f77bcf86cd799439011',
  //       updateData,
  //       { new: true },
  //     );
  //     expect(result).toBeDefined();
  //     expect(result).not.toBeNull();
  //     if (result) {
  //       expect(result.name).toBe('Updated Product');
  //       expect(result.price).toBe(3.99);
  //     }
  //   });
  //   it('should return null when no products exist', async () => {
  //     (Product.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
  //     const result = await updateProduct(
  //       '507f1f77bcf86cd799439011',
  //       updateData,
  //     );
  //     expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
  //       '507f1f77bcf86cd799439011',
  //       updateData,
  //       { new: true },
  //     );
  //     expect(result).toBeNull();
  //   });
  //   it('should handle database errors', async () => {
  //     const error = new Error('Database query failed');
  //     (Product.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);
  //     await expect(
  //       updateProduct('507f1f77bcf86cd799439011', updateData),
  //     ).rejects.toThrow('Database query failed');
  //     expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
  //       '507f1f77bcf86cd799439011',
  //       updateData,
  //       { new: true },
  //     );
  //   });
  // });

  // describe('deleteProduct', () => {
  //   it('should delete product successfully', async () => {
  //     (Product.findByIdAndDelete as jest.Mock).mockResolvedValue(mockProduct);
  //     const result = await deleteProduct('507f1f77bcf86cd799439011');
  //     expect(Product.findByIdAndDelete).toHaveBeenCalledWith(
  //       '507f1f77bcf86cd799439011',
  //     );
  //     expect(result).toEqual(mockProduct);
  //   });
  //   it('should return null when deleting non-existent product', async () => {
  //     (Product.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
  //     const result = await deleteProduct('nonexistent123');
  //     expect(Product.findByIdAndDelete).toHaveBeenCalledWith('nonexistent123');
  //     expect(result).toBeNull();
  //   });
  //   it('should handle deletion errors', async () => {
  //     const error = new Error('Deletion failed');
  //     (Product.findByIdAndDelete as jest.Mock).mockRejectedValue(error);
  //     await expect(deleteProduct('507f1f77bcf86cd799439011')).rejects.toThrow(
  //       'Deletion failed',
  //     );
  //     expect(Product.findByIdAndDelete).toHaveBeenCalledWith(
  //       '507f1f77bcf86cd799439011',
  //     );
  //   });
  // });

  describe('searchProducts', () => {
    const mockSearchResults = [
      mockProduct,
      { ...mockProduct, _id: '507f1f77bcf86cd799439012', name: 'Beta Product' },
    ];
    let mockSort: jest.Mock;
    let mockLimit: jest.Mock;
    let mockSkip: jest.Mock;
    let mockPopulate: jest.Mock;
    let mockCollation: jest.Mock;
    beforeEach(() => {
      mockPopulate = jest.fn().mockResolvedValue(mockSearchResults);
      mockLimit = jest.fn().mockReturnValue({ populate: mockPopulate });
      mockSkip = jest.fn().mockReturnValue({ limit: mockLimit });
      mockSort = jest.fn().mockReturnValue({ skip: mockSkip });
      mockCollation = jest.fn().mockReturnValue({ sort: mockSort });
      (Product.find as jest.Mock).mockReturnValue({
        collation: mockCollation,
      });

      (Product.countDocuments as jest.Mock).mockResolvedValue(2);
    });
    it('should search products with all parameters', async () => {
      const result = await searchProducts(
        'Test',
        '',
        '',
        '',
        'Fruit',
        'name',
        'asc',
        1,
      );
      expect(Product.find).toHaveBeenCalledWith({
        name: { $regex: 'Test', $options: 'i' },
        category: { $regex: 'Fruit', $options: 'i' },
      });
      expect(mockSkip).toHaveBeenCalledWith(0);
      expect(mockLimit).toHaveBeenCalledWith(10);
      expect(mockSort).toHaveBeenCalledWith({ name: 1 });
      expect(result).toEqual({
        products: mockSearchResults,
        totalDocuments: 2,
      });
    });
    it('should search products with only name', async () => {
      const result = await searchProducts(
        'Test',
        '',
        '',
        '',
        '',
        'name',
        'desc',
        1,
      );
      expect(Product.find).toHaveBeenCalledWith({
        name: { $regex: 'Test', $options: 'i' },
      });
      expect(mockSort).toHaveBeenCalledWith({ name: -1 });
      expect(result).toEqual({
        products: mockSearchResults,
        totalDocuments: 2,
      });
    });
    it('should handle search errors', async () => {
      const error = new Error('Search failed');
      mockPopulate.mockRejectedValue(error);
      await expect(
        searchProducts('Test', '', '', '', '', 'name', 'asc', 1),
      ).rejects.toThrow('Search failed');
    });
    it('should handle special regex characters in search terms', async () => {
      (Supplier.find as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });

      await searchProducts(
        'Test.Product',
        '',
        'fruit+',
        'ABC[123]',
        '',
        'name',
        'asc',
        1,
      );
      expect(Product.find).toHaveBeenCalledWith({
        name: { $regex: 'Test.Product', $options: 'i' },
        barcode: { $regex: 'fruit+', $options: 'i' },
        supplier: { $in: [] },
      });
    });
  });

  // describe('getProductsByPriceRange', () => {
  //   it('should return products in price range with pagination', async () => {
  //     const mockLimit = jest.fn().mockResolvedValue([mockProduct]);
  //     const mockSkip = jest.fn().mockReturnValue({ limit: mockLimit });
  //     (Product.find as jest.Mock).mockReturnValue({ skip: mockSkip });
  //     (Product.countDocuments as jest.Mock).mockResolvedValue(1);

  //     const result = await getProductsByPriceRange(1, 5, 1, 10);

  //     expect(Product.countDocuments).toHaveBeenCalledWith({
  //       price: { $gte: 1, $lte: 5 },
  //     });
  //     expect(Product.find).toHaveBeenCalledWith({
  //       price: { $gte: 1, $lte: 5 },
  //     });
  //     expect(mockSkip).toHaveBeenCalledWith(0);
  //     expect(mockLimit).toHaveBeenCalledWith(10);
  //     expect(result).toEqual({ products: [mockProduct], totalDocuments: 1 });
  //   });

  //   it('should return empty when no products match price range', async () => {
  //     const mockLimit = jest.fn().mockResolvedValue([]);
  //     const mockSkip = jest.fn().mockReturnValue({ limit: mockLimit });
  //     (Product.find as jest.Mock).mockReturnValue({ skip: mockSkip });
  //     (Product.countDocuments as jest.Mock).mockResolvedValue(0);

  //     const result = await getProductsByPriceRange(100, 200, 1, 10);

  //     expect(result).toEqual({ products: [], totalDocuments: 0 });
  //   });

  //   it('should handle database errors', async () => {
  //     const error = new Error('Database query failed');
  //     (Product.countDocuments as jest.Mock).mockRejectedValue(error);

  //     await expect(getProductsByPriceRange(1, 5, 1, 10)).rejects.toThrow(
  //       'Database query failed',
  //     );
  //   });
  // });

  // describe('getProductsInStock', () => {
  //   it('should return in-stock products with pagination', async () => {
  //     const mockLimit = jest.fn().mockResolvedValue([mockProduct]);
  //     const mockSkip = jest.fn().mockReturnValue({ limit: mockLimit });
  //     (Product.find as jest.Mock).mockReturnValue({ skip: mockSkip });
  //     (Product.countDocuments as jest.Mock).mockResolvedValue(1);

  //     const result = await getProductsInStock(1, 10);

  //     expect(Product.countDocuments).toHaveBeenCalledWith({
  //       quantityInStock: { $gt: 0 },
  //     });
  //     expect(Product.find).toHaveBeenCalledWith({
  //       quantityInStock: { $gt: 0 },
  //     });
  //     expect(mockSkip).toHaveBeenCalledWith(0);
  //     expect(mockLimit).toHaveBeenCalledWith(10);
  //     expect(result).toEqual({ products: [mockProduct], totalDocuments: 1 });
  //   });

  //   it('should return empty when no products are in stock', async () => {
  //     const mockLimit = jest.fn().mockResolvedValue([]);
  //     const mockSkip = jest.fn().mockReturnValue({ limit: mockLimit });
  //     (Product.find as jest.Mock).mockReturnValue({ skip: mockSkip });
  //     (Product.countDocuments as jest.Mock).mockResolvedValue(0);

  //     const result = await getProductsInStock(1, 10);

  //     expect(result).toEqual({ products: [], totalDocuments: 0 });
  //   });

  //   it('should handle database errors', async () => {
  //     const error = new Error('Database query failed');
  //     (Product.countDocuments as jest.Mock).mockRejectedValue(error);

  //     await expect(getProductsInStock(1, 10)).rejects.toThrow(
  //       'Database query failed',
  //     );
  //   });
  // });

  // describe('getProductsOutOfStock', () => {
  //   it('should return out-of-stock products with pagination', async () => {
  //     const mockLimit = jest.fn().mockResolvedValue([mockProduct]);
  //     const mockSkip = jest.fn().mockReturnValue({ limit: mockLimit });
  //     (Product.find as jest.Mock).mockReturnValue({ skip: mockSkip });
  //     (Product.countDocuments as jest.Mock).mockResolvedValue(1);

  //     const result = await getProductsOutOfStock(1, 10);

  //     expect(Product.countDocuments).toHaveBeenCalledWith({
  //       quantityInStock: 0,
  //     });
  //     expect(Product.find).toHaveBeenCalledWith({ quantityInStock: 0 });
  //     expect(mockSkip).toHaveBeenCalledWith(0);
  //     expect(mockLimit).toHaveBeenCalledWith(10);
  //     expect(result).toEqual({ products: [mockProduct], totalDocuments: 1 });
  //   });

  //   it('should return empty when all products are in stock', async () => {
  //     const mockLimit = jest.fn().mockResolvedValue([]);
  //     const mockSkip = jest.fn().mockReturnValue({ limit: mockLimit });
  //     (Product.find as jest.Mock).mockReturnValue({ skip: mockSkip });
  //     (Product.countDocuments as jest.Mock).mockResolvedValue(0);

  //     const result = await getProductsOutOfStock(1, 10);

  //     expect(result).toEqual({ products: [], totalDocuments: 0 });
  //   });

  //   it('should handle database errors', async () => {
  //     const error = new Error('Database query failed');
  //     (Product.countDocuments as jest.Mock).mockRejectedValue(error);

  //     await expect(getProductsOutOfStock(1, 10)).rejects.toThrow(
  //       'Database query failed',
  //     );
  //   });
  // });
});
