import { useUrlFilters } from '@/hooks/useUrlFilters';
import { toCamelCase } from '@/utils/toCamelCase';

import React from 'react';

// TODO: Refactor inputs with Input component

interface FilterAndSortFormProps {
  filterItems: string[];
}

const sortMenuItems = [
  { label: 'A-Z', value: 'asc' },
  { label: 'Z-A', value: 'desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
];

export const FilterAndSortForm = ({ filterItems }: FilterAndSortFormProps) => {
  const { searchParams, updateMultipleFilters } = useUrlFilters();

  const currentParams: Record<string, string> = Object.fromEntries(
    searchParams.entries(),
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filters: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (value) {
        filters[toCamelCase(key)] = value.toString();
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
            defaultValue={currentParams[toCamelCase(item)] || ''}
          />
        </div>
      ))}
      <label
        htmlFor="sort"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Sort By
      </label>
      <select
        name="sort"
        id="sort"
        className="w-full border border-gray-300 rounded-md p-2 mb-4"
        defaultValue={currentParams[toCamelCase('sort')] || ''}
      >
        <option value="branchName">Branch Name</option>
        <option value="branchEmail">Email</option>
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
        defaultValue={currentParams[toCamelCase('order')] || ''}
      >
        {sortMenuItems.map((item) => (
          <option key={item.label} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <div className="flex justify-end">
        <button
          //   disabled={}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};
