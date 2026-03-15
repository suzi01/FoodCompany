import { Button } from '@/components/common/Button/Button';
import { BasicInfo } from '@/components/Forms/Supplier/BasicInfo';
import { ContactDetails } from '@/components/Forms/Supplier/ContactDetails';
import { SupplierCreationSuccess } from '@/components/Forms/Supplier/SupplierCreationSuccess';

import { CreateSupplier } from '@/models/Supplier';
import { Review } from '@/components/Forms/Supplier/Review';

import { Stepper } from '@mantine/core';
import { useState } from 'react';
import { useCreateSupplier } from '@/services/Suppliers';
import { useMutation } from '@tanstack/react-query';

const data: CreateSupplier = {
  status: 'Active',
  companyName: '',
  mainContactName: '',
  address: '',
  email: '',
  phoneNumber: '',
};

export const SupplierSearch = () => {
  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState<CreateSupplier>(data);

  const mutation = useMutation(useCreateSupplier(formData));

  const handleSubmit = (current: number) => {
    setActive((current) => (current < 3 ? current + 1 : current));
    if (current === 2) {
      mutation.mutate();
    }
  };

  console.log('Form data:', formData);

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
        <Stepper.Step label="Basic info" allowStepSelect={active !== 3}>
          <BasicInfo
            data={formData}
            changedData={(field, value) =>
              setFormData((prev) => ({ ...prev, [field]: value }))
            }
          />
        </Stepper.Step>
        <Stepper.Step label="Contact Details" allowStepSelect={active !== 3}>
          <ContactDetails
            data={formData}
            changedData={(field, value) =>
              setFormData((prev) => ({ ...prev, [field]: value }))
            }
          />
        </Stepper.Step>

        <Stepper.Step label="Review" allowStepSelect={active !== 3}>
          <Review data={formData} setActive={setActive} />
        </Stepper.Step>

        <Stepper.Completed>
          {mutation.isSuccess && (
            <SupplierCreationSuccess
              supplierId={mutation.data.data.id}
              supplierName={formData.companyName}
              contactName={formData.mainContactName}
              contactEmail={formData.email}
              // go to home page on skip
              onSkip={() => setActive(5)}
              // go to product creation form on continue
              onContinue={() => setActive(3)}
            />
          )}
        </Stepper.Completed>
      </Stepper>

      {active !== 3 && (
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
              disabled={active === 3}
              variant="primary"
              onClick={() => handleSubmit(active)}
            >
              {active < 2 ? 'Next step' : 'Finish'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
