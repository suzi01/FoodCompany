import { Button } from '@/components/common/Button/Button';
import { BasicInfo } from '@/components/Forms/Supplier/BasicInfo';
import { ContactDetails } from '@/components/Forms/Supplier/ContactDetails';
import { CreateProducts } from '@/components/Forms/Supplier/CreateProducts';
import { CompanyCreationSuccess } from '@/components/Forms/Supplier/CompanyCreationSuccess';
import { CreateProductPayload } from '@/models/Product';
import { CreateSupplier } from '@/models/Supplier';

import { Stepper } from '@mantine/core';
import { useState } from 'react';
import { ProductCreationSuccess } from '@/components/Forms/Supplier/ProductCreationSuccess/ProductCreationSuccess';

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

        <Stepper.Step label="Product creation">
          <CompanyCreationSuccess
            supplierName={formData.companyName}
            contactName={formData.mainContactName}
            contactEmail={formData.email}
            // go to home page on skip
            onSkip={() => setActive(5)}
            onContinue={() => setActive(3)}
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
        <Stepper.Completed>
          <ProductCreationSuccess />
        </Stepper.Completed>
      </Stepper>

      {active !== 2 && (
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
              disabled={active === 5}
              variant="primary"
              onClick={() =>
                setActive((current) => (current < 5 ? current + 1 : current))
              }
            >
              Next step
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
