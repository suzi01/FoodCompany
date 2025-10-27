import Product from './product.model';
import { CreateProductDto } from './dtos/create-product.dto';
import { EditProductDto } from './dtos/edit-product.dto';

export const getAllProducts = async () => {
  return Product.find();
};

export const getProduct = async (id: string) => {
  return Product.findById(id);
};

export const createProduct = async (data: CreateProductDto) => {
  return Product.create(data);
};

export const updateProduct = async (id: string, data: EditProductDto) => {
  return Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string) => {
  return Product.findByIdAndDelete(id);
};

export const searchProducts = async (
  name: string,
  barcode: string,
  supplier: string,
  category: string,
  sortBy: string = 'name',
  order: string = 'asc',
) => {
  const query: any = {};

  if (name) {
    query.name = { $regex: name, $options: 'i' };
  }

  if (category) {
    query.category = { $regex: category, $options: 'i' };
  }

  if (barcode) {
    query.barcode = { $regex: barcode, $options: 'i' };
  }

  if (supplier) {
    query.supplier = { $regex: supplier, $options: 'i' };
  }

  const sortOrder = order === 'asc' ? 1 : -1;
  const sortObject: any = {};
  sortObject[sortBy] = sortOrder;

  return Product.find(query).sort(sortObject);
};

export const getProductsByPriceRange = async (
  minPrice: number,
  maxPrice: number,
) => {
  return Product.find({
    price: { $gte: minPrice, $lte: maxPrice },
  });
};

export const getProductsInStock = async () => {
  return Product.find({ quantityInStock: { $gt: 0 } });
};

export const getProductsOutOfStock = async () => {
  return Product.find({ quantityInStock: 0 });
};

export const updateProductStock = async (id: string, quantity: number) => {
  // Only allow updating quantityInStock
  return Product.findByIdAndUpdate(
    id,
    { quantityInStock: quantity },
    { new: true },
  );
};

export const bulkUpdateProducts = async (
  updates: Array<{ id: string; data: EditProductDto }>,
) => {
  const promises = updates.map((update) =>
    Product.findByIdAndUpdate(update.id, update.data, { new: true }),
  );
  return Promise.all(promises);
};

export const getProductCount = async () => {
  return Product.countDocuments();
};

export const getProductCountByCategory = async () => {
  return Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);
};
