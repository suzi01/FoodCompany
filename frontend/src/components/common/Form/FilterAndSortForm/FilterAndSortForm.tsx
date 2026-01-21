import { useUrlFilters } from '@/hooks/useUrlFilters';
import React from 'react';

// TODO: Refactor inputs with Input component

interface FilterAndSortFormProps {
  filterItems: string[];
}

const sortMenuItems = [
  { label: 'A-Z' },
  { label: 'Z-A' },
  { label: 'Newest' },
  { label: 'Oldest' },
];

export const FilterAndSortForm = ({ filterItems }: FilterAndSortFormProps) => {
  const { updateMultipleFilters } = useUrlFilters();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const filters: Record<string, string> = {};

    formData.forEach((value, key) => {
      if (value) {
        filters[key] = value.toString();
      }
    });

    updateMultipleFilters(filters);
  };

  return (
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
      <label
        htmlFor="sortBy"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Sort By
      </label>
      <select
        name="sortBy"
        id="sortBy"
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
      >
        <option value="branchName">Branch Name</option>
        <option value="email">Email</option>
        <option value="supplierName">Supplier Name</option>
      </select>

      <label
        htmlFor="order"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Order
      </label>
      <select
        name="order"
        id="order"
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
      >
        {sortMenuItems.map((item) => (
          <option key={item.label} value={item.label.toLowerCase()}>
            {item.label}
          </option>
        ))}
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
  );
};
