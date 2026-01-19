import React from 'react';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';

interface TableProps {
  headers: string[];
  rows: Record<string, unknown>[];
  actions?: boolean;
}

export const Table = ({ headers, rows, actions = false }: TableProps) => {
  return (
    <div>
      <table className="table w-full border-collapse table-fixed">
        <TableHeader headers={headers} actions={actions} />
        <tbody>
          <TableRow rowItems={rows} actions={actions} headers={headers} />
        </tbody>
      </table>
    </div>
  );
};
