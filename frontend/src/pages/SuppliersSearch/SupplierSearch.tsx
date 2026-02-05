import { Button } from '@/components/common/Button/Button';
import { BasicInfo } from '@/components/Forms/Supplier/BasicInfo';
import { ContactDetails } from '@/components/Forms/Supplier/ContactDetails';
import { CreateProducts } from '@/components/Forms/Supplier/CreateProducts';
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

export const SupplierSearch = () => {
  const [active, setActive] = useState(0);

  const [formData, setFormData] = useState<CreateSupplier>(data);

  console.log('formData', formData);

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
          <CreateProducts
            data={formData.productsProvided}
            changedData={(field, value) => {
              setFormData((prev) => ({ ...prev, [field]: value }));
            }}
          />
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
          <p> create success/fail page</p>
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
