import React, { ReactNode } from 'react';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';

interface TableProps {
  headers: string[];
  rows: Record<string, unknown>[];
  actions?: boolean;
  otherActions?: ReactNode;
}

export const Table = ({
  headers,
  rows,
  actions = false,
  otherActions,
}: TableProps) => {
  return (
    <div
      className="overflow-x-auto w-full"
      style={{ maxWidth: 'calc(100vw - 2rem)' }}
    >
      <table className="table w-full border-collapse table-auto">
        <TableHeader headers={headers} actions={actions || Boolean(otherActions)} />
        <tbody>
          <TableRow
            rowItems={rows}
            actions={actions}
            headers={headers}
            otherActions={otherActions}
          />
        </tbody>
      </table>
    </div>
  );
};

// import React from 'react';
// import { TableHeader } from '../TableHeader';
// import { TableRow } from '../TableRow';

// interface TableProps {
//   headers: string[];
//   rows: Record<string, unknown>[];
//   actions?: boolean;
// }

// export const Table = ({ headers, rows, actions = false }: TableProps) => {
//   return (
//     <div className="overflow-x-auto w-full" style={{ maxWidth: 'calc(100vw - 2rem)' }}>
//       <table className="table border-collapse table-auto whitespace-nowrap">
//         <TableHeader headers={headers} actions={actions} />
//         <tbody>
//           <TableRow rowItems={rows} actions={actions} headers={headers} />
//         </tbody>
//       </table>
//     </div>
//   );
// };
