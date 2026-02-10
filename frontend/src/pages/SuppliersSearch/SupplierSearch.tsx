import { Button } from '@/components/common/Button/Button';
import { BasicInfo } from '@/components/Forms/Supplier/BasicInfo';
import { ContactDetails } from '@/components/Forms/Supplier/ContactDetails';
import { Review } from '@/components/Forms/Supplier/Review';
import { CreateProductPayload } from '@/models/Product';
import { CreateSupplier } from '@/models/Supplier';

import { Stepper } from '@mantine/core';
import { useState } from 'react';

const data: CreateSupplier = {
  companyName: '',
  mainContactName: '',
  address: '',
  email: '',
  phoneNumber: '',
  productsProvided: [] as CreateProductPayload[],
};

export const SuppliersSearch = () => {
  const [active, setActive] = useState(0);

  const [formData, setFormData] = useState<CreateSupplier>(data);

  return (
    <div className="w-full flex-1 bg-white py-5 px-3 md:p-6 rounded-md border mt-8 flex flex-col">
      <Stepper
        styles={{
          step: { display: 'flex', flexDirection: 'column', gap: '16px' },
        }}
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="Basic info">
          <BasicInfo
            data={formData}
            changedData={(field, value) =>
              setFormData((prev) => ({ ...prev, [field]: value }))
            }
          />
        </Stepper.Step>
        <Stepper.Step label="Contact Details">
          <ContactDetails
            data={formData}
            changedData={(field, value) =>
              setFormData((prev) => ({ ...prev, [field]: value }))
            }
          />
        </Stepper.Step>
        <Stepper.Step label="Products">
          <form className="p-4 md:p-10">
            <h2>Create new products to be added</h2>
            <div className="grid md:grid-cols-4 gap-6 mt-4">
              <div className={`flex flex-col gap-1 col-span-4 `}>
                <label htmlFor="name" className=" text-gray-500">
                  Product Name *
                </label>
                <input
                  required
                  id="name"
                  type="text"
                  name="name"
                  className="border-2 border-gray-200 p-2 mb-4 rounded focus:border-black outline-none text-black"
                />
              </div>
              <div className={`flex flex-col gap-1 col-span-2 `}>
                <label htmlFor="category" className=" text-gray-500">
                  Category *
                </label>
                <input
                  required
                  id="category"
                  type="text"
                  name="category"
                  className="border-2 border-gray-200 p-2 mb-4 rounded focus:border-black outline-none text-black"
                />
              </div>
              <div className={`flex flex-col gap-1 `}>
                <label htmlFor="price" className=" text-gray-500">
                  Price*
                </label>
                <input
                  required
                  id="price"
                  type="text"
                  name="price"
                  className="border-2 border-gray-200 p-2 mb-4 rounded focus:border-black outline-none text-black"
                />
              </div>
              <div className={`flex flex-col gap-1 `}>
                <label htmlFor="quantityInStock" className=" text-gray-500">
                  Quantity in stock
                </label>
                <input
                  required
                  id="quantityInStock"
                  type="text"
                  name="quantityInStock"
                  className="border-2 border-gray-200 p-2 mb-4 rounded focus:border-black outline-none text-black"
                />
              </div>
              <div className={`flex flex-col gap-1 col-span-2 `}>
                <label htmlFor="idOrBarcode" className=" text-gray-500">
                  ID or Barcode
                </label>
                <input
                  required
                  id="idOrBarcode"
                  type="text"
                  name="idOrBarcode"
                  className="border-2 border-gray-200 p-2 mb-4 rounded focus:border-black outline-none text-black"
                />
              </div>
              <div className={`flex flex-col gap-1 col-span-2 `}>
                <label htmlFor="description" className=" text-gray-500">
                  Description
                </label>
                <div className={`flex flex-col gap-1 col-span-2 `}>
                  <textarea
                    rows={4}
                    required
                    id="description"
                    name="description"
                    className="border-2 border-gray-200 p-2 mb-4 rounded focus:border-black outline-none text-black"
                  />
                </div>
              </div>
              {/* // TODO: Add Table to show created products */}
            </div>
          </form>
        </Stepper.Step>
        <Stepper.Step label="Review">
          <Review data={formData} setActive={setActive} />
        </Stepper.Step>
        <Stepper.Completed>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="mb-2">
              <strong>{key}:</strong>{' '}
              {Array.isArray(value) ? value.join(', ') : value}
            </div>
          ))}
        </Stepper.Completed>
      </Stepper>

      <div className="flex justify-between mt-auto pt-4 border-t">
        <Button
          variant="tertiary"
          disabled={active === 0}
          onClick={() =>
            setActive((current) => (current > 0 ? current - 1 : current))
          }
        >
          Go Back
        </Button>
        <div className="flex gap-4">
          <Button variant="tertiary" onClick={() => console.log('Cancel')}>
            Cancel
          </Button>
          <Button
            disabled={active === 4}
            variant="primary"
            onClick={() =>
              setActive((current) => (current < 4 ? current + 1 : current))
            }
          >
            Next step
          </Button>
        </div>
      </div>
    </div>
  );
};
