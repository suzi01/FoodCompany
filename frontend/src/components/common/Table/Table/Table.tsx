import React, { ReactNode } from 'react';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';

export interface ColumnDef<T extends object> {
  key: keyof T;
  label: string;
  visible?: boolean;
}

export interface TableProps<T extends object> {
  columns: ColumnDef<T>[];
  rows: T[];
  actions?: boolean;
  otherActions?: (rowIndex: number) => ReactNode;
}

export const Table = <T extends object>({
  columns,
  rows,
  actions = false,
  otherActions,
}: TableProps<T>) => {
  return (
    <div
      className="overflow-x-auto w-full"
      style={{ maxWidth: 'calc(100vw - 2rem)' }}
    >
      <table className="table w-full border-collapse table-auto">
        <TableHeader
          columns={columns}
          actions={actions || Boolean(otherActions)}
        />
        <tbody>
          <TableRow
            rowItems={rows}
            actions={actions}
            columns={columns}
            otherActions={otherActions}
          />
        </tbody>
      </table>
    </div>
  );
};
