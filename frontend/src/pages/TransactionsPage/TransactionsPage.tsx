import { Card } from '@/components/common/Card';
import { Heading } from '@/components/common/Heading';
import { Table } from '@/components/common/Table/Table';
import { Link } from 'react-router-dom';

const rawTransactions = [
  {
    TransactionID: '123456789',
    Products: ['Apple'],
    Customer: 'John Doe',
    Cost: 12.99,
    Amount: 1,
    Status: 'Active',
    Date: '2024-06-15',
  },
  {
    TransactionID: '987654321',
    Products: ['Banana', 'Orange', 'Mango'],
    Customer: 'Jane Smith',
    Cost: 24.99,
    Amount: 3,
    Status: 'Pending',
    Date: '2024-06-14',
  },
  {
    TransactionID: '456789123',
    Products: ['Carrot'],
    Customer: 'Alice Johnson',
    Cost: 5.75,
    Amount: 1,
    Status: 'Active',
    Date: '2024-06-13',
  },
  {
    TransactionID: '555666777',
    Products: ['Tomato', 'Lettuce'],
    Customer: 'Bob Wilson',
    Cost: 8.5,
    Amount: 2,
    Status: 'Active',
    Date: '2024-06-12',
  },
  {
    TransactionID: '888999000',
    Products: ['Broccoli'],
    Customer: 'Carol Davis',
    Cost: 3.25,
    Amount: 1,
    Status: 'Pending',
    Date: '2024-06-11',
  },
];

// Transform raw transactions to include formatted ProductName for display
const transactions = rawTransactions.map((tx) => ({
  ...tx,
  ProductName:
    tx.Products.length === 1
      ? tx.Products[0]
      : `${tx.Products.length} items...`,
}));

export const TransactionsPage = () => {
  return (
    <div className="flex flex-col gap-6 mt-7">
      <div className="flex flex-row items-center justify-between">
        <Heading level={1} className="font-semibold">
          All Transactions
        </Heading>
        <Link
          to="/"
          className="text-[#1C2ECC] text-md font-semibold hover:underline"
        >
          Back to Home
        </Link>
      </div>

      <Card className="flex flex-col gap-4">
        <Table
          actions={false}
          columns={[
            { key: 'TransactionID', label: 'Transaction ID' },
            { key: 'ProductName', label: 'Product Name' },
            { key: 'Customer', label: 'Customer' },
            { key: 'Cost', label: 'Cost' },
            { key: 'Amount', label: 'Amount' },
            { key: 'Status', label: 'Status' },
            { key: 'Date', label: 'Date' },
          ]}
          rows={transactions}
        />
      </Card>
    </div>
  );
};
