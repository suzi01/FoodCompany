import { Input } from '@/components/common/Input';

import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormInput } from './IFormInput';

interface EditBranchFormProps {
  branch: IFormInput;
  onSubmit: SubmitHandler<IFormInput>;
}

export const EditBranchForm = ({ branch, onSubmit }: EditBranchFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      ...branch,
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2">
      <Input
        label="Branch Name"
        id="branchName"
        className="col-span-2"
        {...register('branchName')}
      />

      <Input
        label="Years Active"
        id="yearsActive"
        disabled
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
          id="address"
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
        disabled={!isDirty || !isValid}
        className="border rounded p-2 col-span-2 bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save
      </button>
    </form>
  );
};
