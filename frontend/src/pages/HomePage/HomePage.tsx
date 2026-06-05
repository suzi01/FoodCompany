import Graph from '@/assets/graph.svg';
import { Card } from '@/components/common/Card';
import { Heading } from '@/components/common/Heading';
import { Image } from '@/components/common/Image';
import { Table } from '@/components/common/Table/Table';
import { LineChart } from '@mantine/charts';
import { RingProgress, Text } from '@mantine/core';
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
];

const lineGraphData = [
  { date: 'Jan', temperature: 5000 },
  { date: 'Feb', temperature: 6200 },
  { date: 'Mar', temperature: 5800 },
  { date: 'Apr', temperature: 7100 },
  { date: 'May', temperature: 8300 },
  { date: 'Jun', temperature: 7600 },
  { date: 'Jul', temperature: 9200 },
  { date: 'Aug', temperature: 10100 },
  { date: 'Sep', temperature: 8900 },
  { date: 'Oct', temperature: 7800 },
  { date: 'Nov', temperature: 6500 },
  { date: 'Dec', temperature: 8700 },
];

// Transform raw transactions to include formatted ProductName for display
const transactions = rawTransactions.map((tx) => ({
  ...tx,
  ProductName:
    tx.Products.length === 1
      ? tx.Products[0]
      : `${tx.Products.length} items...`,
}));

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-10 mt-7">
      <div>
        <Heading level={1} className="mt-4 mb-2 font-semibold">
          Welcome back Rivera!
        </Heading>
        <p>Here's what's happening today</p>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <Card className="flex flex-col gap-8">
          <div className="flex flex-row justify-between font-semibold">
            <p className="text-xs">TOTAL REVENUE</p>
            <span className="text-red-600">+5%</span>
          </div>
          <div className="flex flex-row justify-between font-bold text-2xl">
            <p>$128,430</p>
            <Image src={Graph} alt="graph icon" className="w-1/3 flex" />
          </div>
        </Card>
        <Card className="flex flex-col gap-8">
          <div className="flex flex-row justify-between font-semibold">
            <p className="text-xs">TOTAL CUSTOMERS</p>
            <span className="text-green-600">+3%</span>
          </div>
          <div className="flex flex-row justify-between font-bold text-2xl">
            <p>14,280</p>
            <Image src={Graph} alt="graph icon" className="w-1/3 flex" />
          </div>
        </Card>
        <Card className="flex flex-col gap-8">
          <div className="flex flex-row justify-between font-semibold">
            <p className="text-xs">TOTAL TRANSACTIONS</p>
            <span className="text-yellow-600">+2%</span>
          </div>
          <div className="flex flex-row justify-between font-bold text-2xl">
            <p>3842</p>
            <Image src={Graph} alt="graph icon" className="w-1/3 flex" />
          </div>
        </Card>
        <Card className="flex flex-col gap-8">
          <div className="flex flex-row justify-between font-semibold">
            <p className="text-xs">TOTAL PRODUCTS</p>
            <span className="text-blue-600">+8%</span>
          </div>
          <div className="flex flex-row justify-between font-bold text-2xl">
            <p>1154</p>
            <Image src={Graph} alt="graph icon" className="w-1/3 flex" />
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className=" lg:col-span-2 col-span-3">
          <Heading level={5} className="text-xl mt-4 mb-2 font-semibold">
            Sales Overview
          </Heading>
          <p className="pb-4">Real time user engagement</p>
          <LineChart
            h={250}
            data={lineGraphData}
            series={[{ name: 'temperature', label: 'Sales Revenue' }]}
            dataKey="date"
            type="gradient"
            gradientStops={[
              { offset: 0, color: 'blue.1' },
              { offset: 20, color: 'blue.2' },
              { offset: 40, color: 'blue.3' },
              { offset: 60, color: 'blue.4' },
              { offset: 80, color: 'blue.5' },
              { offset: 100, color: 'blue.7' },
            ]}
            strokeWidth={5}
            curveType="natural"
            yAxisProps={{ domain: [0, 10000] }}
            valueFormatter={(value) => `$${value}`}
          />
        </Card>
        <Card className="text-center lg:col-span-1 col-span-2 items-center flex flex-col">
          <Heading level={5} className="mt-4 mb-2 font-semibold">
            Statistics Revenue
          </Heading>
          <p className="font-thin text-sm">Monthly target achievement</p>

          <RingProgress
            size={250}
            roundCaps
            thickness={25}
            transitionDuration={250}
            sections={[{ value: 40, color: 'blue' }]}
            label={
              <Text c="blue" fw={700} ta="center" size="xl">
                40%
              </Text>
            }
          />
        </Card>
      </div>
      <div className="flex flex-col gap-4 bg-white p-6">
        <div className="flex flex-row justify-between items-center">
          <Heading level={5} className="mt-4 mb-2 font-semibold">
            History Transactions
          </Heading>
          <Link
            to="/transactions"
            className="text-[#1C2ECC] text-md font-semibold"
          >
            View All Activity
          </Link>
        </div>

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
      </div>
    </div>
  );
};
