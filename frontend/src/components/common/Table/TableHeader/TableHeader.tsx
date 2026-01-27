import React from 'react';
import { formatHeader } from '@/utils/formatHeader';

interface TableHeaderProps {
  headers: string[];
  actions: boolean;
}

export const TableHeader = ({ headers, actions }: TableHeaderProps) => {
  return (
    <thead>
      <tr className="text-left table-row border-b border-[#DFDFDF] text-[#808080]">
        {headers.map((headerItem, index) => (
          <th
            key={`${headerItem}-${index}`}
            title={headerItem}
            className="px-2 py-3 font-light text-[18px] capitalize"
          >
            {formatHeader(headerItem)}
          </th>
        ))}
        {actions && (
          <th
            key="actions-header"
            title="Actions"
            className="font-light text-[18px] capitalize px-2 py-3"
          >
            Actions
          </th>
        )}
      </tr>
    </thead>
  );
};
