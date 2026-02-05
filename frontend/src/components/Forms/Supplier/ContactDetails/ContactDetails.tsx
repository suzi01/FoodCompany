import { CreateSupplier } from '@/models/Supplier';
import { Input } from '@/components/common/Input';

interface ContactDetailsProps {
  data: CreateSupplier;
  changedData: (field: string, value: string) => void;
}

export const ContactDetails = ({ data, changedData }: ContactDetailsProps) => {
  return (
    <div className="p-4 md:p-10">
      {/* TODO: Update form fields as per requirements and used Input components where applicable */}
      <form className="md:grid grid-cols-2 gap-6">
        <Input
          required
          className="flex flex-col gap-1 col-span-2"
          label="Main Contact Name *"
          id="mainContactName"
          name="mainContactName"
          value={data.mainContactName}
          onChange={(e) => changedData(e.target.name, e.target.value)}
        />

        <Input
          required
          className="flex flex-col gap-1 "
          label="Email address"
          id="email"
          name="email"
          value={data.email}
          onChange={(e) => changedData(e.target.name, e.target.value)}
        />

        <Input
          required
          className="flex flex-col gap-1 "
          label="Phone number"
          id="phoneNumber"
          name="phoneNumber"
          value={data.phoneNumber}
          onChange={(e) => changedData(e.target.name, e.target.value)}
        />

        <div className={`flex flex-col gap-1 col-span-2 `}>
          <label htmlFor="address" className=" text-gray-500">
            Address
          </label>
          <textarea
            rows={4}
            required
            id="address"
            name="address"
            className="border-2 border-gray-200 p-2 mb-4 rounded focus:border-black outline-none text-black"
            value={data.address}
            onChange={(e) => changedData(e.target.name, e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};
