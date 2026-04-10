import React from 'react';
import type { ColumnDef } from '../Table/Table';

interface TableHeaderProps<T extends object> {
  columns: ColumnDef<T>[];
  actions: boolean;
}

export const TableHeader = <T extends object>({
  columns,
  actions,
}: TableHeaderProps<T>) => {
  return (
    <thead>
      <tr className="text-left table-row border-b border-[#DFDFDF] text-[#808080]">
        {columns.map((column, index) => (
          <th
            key={`${String(column.key)}-${index}`}
            title={column.label}
            className="px-2 py-3 font-light text-[18px] capitalize"
          >
            {column.label}
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
