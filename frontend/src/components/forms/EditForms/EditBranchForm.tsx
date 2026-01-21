import { Input } from '@/components/common/Input';

import { useForm } from 'react-hook-form';

interface IFormInput {
  id: string;
  branchName: string;
  yearsActive: string;
  phoneNumber: string;
  address: string;
  branchEmail: string;
  mainContactName: string;
  mainContactPhoneNumber: string;
  mainContactEmail: string;
}

export const EditBranchForm = () => {
  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      id: '1',
      branchName: 'Downtown Branch',
      yearsActive: '5',
      phoneNumber: '555-1234',
      address: '123 Main St, Cityville',
      branchEmail: 'downtown@example.com',
      mainContactName: 'John Doe',
      mainContactPhoneNumber: '555-5678',
      mainContactEmail: 'john.doe@example.com',
    },
  });
  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="grid grid-cols-2 gap-2"
    >
      <Input
        label="Branch Name"
        id="branchName"
        className="col-span-2"
        {...register('branchName')}
      />

      <Input
        label="Years Active"
        id="yearsActive"
        {...register('yearsActive')}
      />
      <Input
        label="Phone Number"
        id="phoneNumber"
        {...register('phoneNumber')}
      />

      <div className="flex flex-col gap-1 col-span-2">
        <label htmlFor="address" className=" text-gray-500">
          Address
        </label>
        <textarea
          rows={5}
          className="col-span-2 border-2 border-gray-200 p-2 mb-4 rounded focus:border-black outline-none text-black"
          {...register('address')}
        />
      </div>

      <Input
        label="Email"
        id="branchEmail"
        {...register('branchEmail')}
        className="col-span-2"
      />

      <hr className="col-span-2" />

      <Input
        label="Contact Name"
        id="mainContactName"
        {...register('mainContactName')}
        className="col-span-2"
      />
      <Input
        label="Contact Number"
        type="tel"
        id="mainContactPhoneNumber"
        {...register('mainContactPhoneNumber')}
      />

      <Input
        label="Contact Email"
        type="email"
        id="mainContactEmail"
        {...register('mainContactEmail')}
      />
      <button
        type="submit"
        className="border rounded p-2 col-span-2 bg-blue-500 text-white"
      >
        Save
      </button>
    </form>
  );
};
