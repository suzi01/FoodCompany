import Bin from '@/assets/icons/trash.svg';
import { Image } from '@/components/common/Image';
import { Input } from '@/components/common/Input';
import { FormEvent, useState } from 'react';
import { MultiSelectMemo } from '../../common/MultiSelect/MultiSelect';
import { Table } from '../../common/Table/Table';

interface EditBranchSupplierProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  supplier: { id: string; companyName: string; status: string };
}

const options = [
  { id: '1', label: 'Technology' },
  { id: '2', label: 'Lifestyle' },
  { id: '3', label: 'Finance' },
  { id: '4', label: 'Education' },
  { id: '5', label: 'Healthcare' },
];

export const EditBranchSupplier = ({
  handleSubmit,
  supplier,
}: EditBranchSupplierProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  //   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     console.log('Form submitted', e.currentTarget);
  //     const formData = new FormData(e.currentTarget);
  //     console.log(Object.fromEntries(formData.entries()));
  //     console.log('Selected IDs:', selectedIds);
  //   };

  return (
    <div className="bg-white p-6">
      <form
        id="edit-supplier"
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-2 "
      >
        <Input
          className="col-span-2"
          label="Select Supplier"
          id="select-supplier"
          disabled
          value={supplier.companyName}
        />

        <div className="col-span-2 bg-white p-4 border border-gray-300 rounded-md shadow-sm gap-2">
          <Table
            otherActions={
              <button className="">
                <Image src={Bin} alt="Expand" width={16} height={16} />
              </button>
            }
            headers={['Product name', 'Price/Unit']}
            rows={[
              { 'Product name': 'Apples', 'Price/Unit': '$2.00' },
              { 'Product name': 'Bananas', 'Price/Unit': '$1.50' },
              { 'Product name': 'Cherries', 'Price/Unit': '$3.00' },
            ]}
          />
        </div>
      </form>
      <hr />
      <label
        htmlFor="products"
        className="block  font-medium mb-1 mt-4 text-gray-500 uppercase"
      >
        Add new products
      </label>
      <MultiSelectMemo
        options={options}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        addButtonLabel="Add Product"
      />
    </div>
  );
};
