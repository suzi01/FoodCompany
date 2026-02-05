import Bin from '@/assets/icons/trash.svg';
import { Button } from '@/components/common/Button';
import { Image } from '@/components/common/Image/Image';
import { Input } from '@/components/common/Input';
import { NotificationBanner } from '@/components/common/NotificationBanner/NotificationBanner';
import { Table } from '@/components/common/Table/Table';
import { CreateProductPayload } from '@/models/Product';
import { useState } from 'react';

interface CreateProductsProps {
  data: CreateProductPayload[];
  changedData: (field: string, value: CreateProductPayload[]) => void;
}

const newProduct: CreateProductPayload = {
  name: '',
  category: '',
  idOrBarcode: '',
  supplier: '',
  price: 1.0,
  quantityInStock: 0,
  description: '',
};

export const CreateProducts = ({ data, changedData }: CreateProductsProps) => {
  const [product, setProduct] = useState<CreateProductPayload>(newProduct);

  const handleProductAdd = () => {
    changedData('productsProvided', [...data, product]);
    setProduct(newProduct);
  };

  return (
    <form className="p-4 md:p-10 ">
      <h2>Create new products to be added</h2>
      <div className="grid md:grid-cols-4 gap-6 mt-4">
        <Input
          className="flex flex-col gap-1 col-span-4"
          label="Product Name *"
          id="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        <Input
          required
          className="flex flex-col gap-1 col-span-2"
          label="Category *"
          id="category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />

        <Input
          required
          className="flex flex-col gap-1"
          label="price *"
          id="price"
          type="text"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: parseFloat(e.target.value) })
          }
        />

        <Input
          required
          className="flex flex-col gap-1"
          label=" Quantity in stock"
          id="quantityInStock"
          type="number"
          value={product.quantityInStock}
          onChange={(e) =>
            setProduct({
              ...product,
              quantityInStock: parseInt(e.target.value),
            })
          }
        />

        <Input
          required
          className="flex flex-col gap-1 col-span-2"
          label="idOrBarcode"
          id="idOrBarcode"
          value={product.idOrBarcode}
          onChange={(e) =>
            setProduct({ ...product, idOrBarcode: e.target.value })
          }
        />

        <Input
          required
          className="flex flex-col gap-1 col-span-2"
          label="Description *"
          id="description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        <Button
          variant="secondary"
          type="button"
          onClick={handleProductAdd}
          disabled={!product.name || !product.category || !product.description}
        >
          Add Product
        </Button>

        <div className="col-span-4 max-h-52 overflow-y-auto mt-4">
          {data.length === 0 ? (
            <NotificationBanner
              type="info"
              message="Products added here will appear in a tracking table"
            />
          ) : (
            <Table
              rows={data}
              headers={['name', 'category', 'price']}
              otherActions={
                <button className="">
                  <Image src={Bin} alt="Expand" width={16} height={16} />
                </button>
              }
            />
          )}
        </div>
      </div>
    </form>
  );
};
