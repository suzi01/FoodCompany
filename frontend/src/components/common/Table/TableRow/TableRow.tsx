import { BasicMenu as ActionMenu } from '../../BasicMenu';
import { StatusBadge } from '../../StatusBadge';
import { StatusType } from '../../StatusBadge/StatusBadge';

export interface TableRowProps {
  rowItems: Record<string, unknown>[];
  actions?: boolean;
  headers: string[];
}

export const TableRow = ({
  rowItems,
  actions = false,
  headers,
}: TableRowProps) => {
  return (
    <>
      {rowItems.map((rowItem, rowIndex) => (
        <tr className="table-row text-left" key={`row-${rowIndex}`}>
          {headers.map((value, cellIndex) => {
            if (value.toLowerCase() === 'status') {
              return (
                <td
                  key={`cell-${cellIndex}`}
                  title={String(value)}
                  className="px-2 py-6 table-cell border-b border-[#DFDFDF] font-light text-[16px]"
                >
                  <>
                    <StatusBadge
                      value={String(rowItem[value]).toLowerCase() as StatusType}
                    />
                    {String(rowItem[value])}
                  </>
                </td>
              );
            }
            return (
              <td
                key={`cell-${cellIndex}`}
                title={String(value)}
                className="px-2 py-6 table-cell border-b border-[#DFDFDF] font-light text-[16px]"
              >
                {Array.isArray(rowItem[value])
                  ? rowItem[value].join(', ')
                  : String(rowItem[value])}
              </td>
            );
          })}
          {actions && (
            <td
              key="actions-cell"
              className="px-4 py-6 table-cell border-b border-[#DFDFDF] font-light text-[16px]"
            >
              <ActionMenu
                items={[
                  { label: 'View', href: `view/${rowItem.id}` },
                  { label: 'Edit', href: `edit/${rowItem.id}` },
                  {
                    label: 'Delete',
                    href: `delete/${rowItem.id}`,
                    color: 'red',
                  },
                ]}
                target={<p style={{ color: 'black' }}>•••</p>}
              />
            </td>
          )}
        </tr>
      ))}
    </>
  );
};
