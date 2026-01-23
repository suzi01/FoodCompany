import { CreateSupplier } from '@/models/Supplier';


interface ContactDetailsProps {
  data: CreateSupplier;
  changedData: (field: string, value: string) => void;
}

export const ContactDetails = ({ data, changedData }: ContactDetailsProps) => {
  return (
    <div className="p-4 md:p-10">
      {/* TODO: Update form fields as per requirements and used Input components where applicable */}
      <form className="md:grid grid-cols-2 gap-6">
        <div className={`flex flex-col gap-1 col-span-2 `}>
          <label htmlFor="mainContactName" className=" text-gray-500">
            Main Contact Name *
          </label>
          <input
            required
            id="mainContactName"
            type="text"
            name="mainContactName"
            className="border-2 border-gray-200 p-2 mb-4 rounded focus:border-black outline-none text-black"
            value={data.mainContactName}
            onChange={(e) => changedData(e.target.name, e.target.value)}
          />
        </div>
        <div className={`flex flex-col gap-1 `}>
          <label htmlFor="email" className=" text-gray-500">
            Email address
          </label>
          <input
            required
            id="email"
            type="text"
            name="email"
            className="border-2 border-gray-200 p-2 mb-4 rounded focus:border-black outline-none text-black"
            value={data.email}
            onChange={(e) => changedData(e.target.name, e.target.value)}
          />
        </div>
        <div className={`flex flex-col gap-1 `}>
          <label htmlFor="phoneNumber" className=" text-gray-500">
            Phone number
          </label>
          <input
            required
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            className="border-2 border-gray-200 p-2 mb-4 rounded focus:border-black outline-none text-black"
            value={data.phoneNumber}
            onChange={(e) => changedData(e.target.name, e.target.value)}
          />
        </div>

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
