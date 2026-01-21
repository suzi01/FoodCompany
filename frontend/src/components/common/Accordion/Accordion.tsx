import ChevronDown from '@/assets/icons/chevron-down.svg';
import Bin from '@/assets/icons/trash.svg';
import { Image } from '@/components/common/Image';
import { Table } from '../Table/Table';
import { MultiSelectMemo } from '../MultiSelect/MultiSelect';
import { FormEvent, useState } from 'react';
import { Select } from '../Select';

interface AccordionProps {
  isOpen: boolean;
  onClick: () => void;
}

const options = [
  { id: '1', label: 'Technology' },
  { id: '2', label: 'Lifestyle' },
  { id: '3', label: 'Finance' },
  { id: '4', label: 'Education' },
  { id: '5', label: 'Healthcare' },
];

export const Accordion = ({ isOpen, onClick }: AccordionProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted', e.currentTarget);
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
    console.log('Selected IDs:', selectedIds);
  };

  return (
    <div className="border-2 border-blue-300 rounded-md bg-blue-100">
      <div className="flex justify-between items-center cursor-pointer w-full p-4 ">
        <div className="flex gap-3 items-center">
          <Image src={ChevronDown} alt="Expand" width={16} height={16} />

          <div className="block">
            <p>Green Harvest co op</p>
            <p>Primary Supplier</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p>Active</p>
          <button onClick={() => onClick()}>
            <Image
              src={ChevronDown}
              alt="Expand"
              width={16}
              height={16}
              className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="bg-white p-4">
          <form
            id="edit-supplier"
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-2 "
          >
            <Select
              className="col-span-2"
              label="Select Supplier"
              name="supplier"
              options={['Supplier 1', 'Supplier 2', 'Supplier 3']}
            />
            <Select
              className="col-span-2"
              label="Product Category"
              name="product-category"
              options={['Category 1', 'Category 2', 'Category 3']}
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
            className="block text-sm font-medium text-gray-700 mb-1 mt-4"
          >
            Add new products
          </label>
          <MultiSelectMemo
            options={options}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            addButtonLabel="Add Product"
          />

          <button
            type="submit"
            form="edit-supplier"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};
