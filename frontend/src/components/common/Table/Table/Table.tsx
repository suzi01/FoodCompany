import React, { ReactNode } from 'react';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';

interface TableProps<T extends object> {
  headers: (keyof T)[];
  rows: T[];
  actions?: boolean;
  otherActions?: ReactNode;
}

export const Table = <T extends object>({
  headers,
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
          headers={headers as string[]}
          actions={actions || Boolean(otherActions)}
        />
        <tbody>
          <TableRow
            rowItems={rows}
            actions={actions}
            headers={headers as (keyof T)[]}
            otherActions={otherActions}
          />
        </tbody>
      </table>
    </div>
  );
};
