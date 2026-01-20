import React, { Dispatch } from 'react';
import { Drawer as MantineDrawer } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';

export const Drawer = ({
  opened,
  setOpened,
  filterItems,
}: {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
  filterItems: string[];
}) => {
  const [, setSearchParams] = useSearchParams();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    formData.forEach((value, key) => {
      if (value) {
        urlSearchParams.append(key, value.toString());
      }
    });
    setSearchParams(urlSearchParams);
    // console.log('Form Data:', Object.fromEntries(formData.entries()));
    // console.log('Search Params:', searchParams.toString());
  };
  return (
    <MantineDrawer
      opened={opened}
      onClose={() => setOpened(false)}
      title="Filter Options"
      padding="xl"
      size="md"
    >
      <form onSubmit={handleFormSubmit}>
        {filterItems.map((item) => (
          <div key={item} className="mb-4">
            <label
              htmlFor={item.toLocaleLowerCase()}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {item}
            </label>
            <input
              type="text"
              id={item.toLocaleLowerCase()}
              name={item.toLocaleLowerCase()}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}
        <p>Sort by</p>
        <select className="w-full border border-gray-300 rounded-md p-2 mb-4">
          <option value="branchName">Branch Name</option>
          <option value="email">Email</option>
          <option value="supplierName">Supplier Name</option>
        </select>
        <select className="w-full border border-gray-300 rounded-md p-2 mb-4">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
          <option value="newest">Recent</option>
          <option value="oldest">Oldest</option>
        </select>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </MantineDrawer>
  );
};
