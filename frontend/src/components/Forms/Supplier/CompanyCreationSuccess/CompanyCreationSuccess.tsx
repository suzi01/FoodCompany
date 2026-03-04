import { Button } from '@/components/common/Button';

interface CompanyCreationSuccessProps {
  supplierName: string;
  contactName: string;
  contactEmail: string;
  onSkip: () => void;
  onContinue: () => void;
}

export const CompanyCreationSuccess = ({
  supplierName,
  contactName,
  contactEmail,
  onSkip,
  onContinue,
}: CompanyCreationSuccessProps) => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center py-8">
      <p>tick</p>
      <h1 className="text-3xl font-bold">
        Supplier <span className="text-green-500">{supplierName}</span> created
        successfully!
      </h1>
      <p className="text-center text-gray-600 max-w-md">
        The basic profile and contact details have been saved. You can now
        proceed to assign products to this supplier.
      </p>
      <div className="rounded-md bg-gray-100 p-4 gap-3 flex flex-col my-6">
        <p className="uppercase text-gray-500">Supplier summary</p>
        <hr />
        <div className="flex justify-between gap-6">
          <div>
            <p className="text-gray-500">Supplier ID</p>
            <p>SUP-2023-234</p>
          </div>
          <div>
            <p className="text-gray-500">Supplier Name</p>
            <p>{supplierName}</p>
          </div>
          <div>
            <p className="text-gray-500">Primary Contact Name</p>
            <p>{contactName}</p>
            <p className="text-gray-500">{contactEmail}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={onContinue} variant="primary">
          Add products now
        </Button>
        <Button onClick={onSkip} variant="tertiary">
          Skip for now
        </Button>
      </div>
    </div>
  );
};
