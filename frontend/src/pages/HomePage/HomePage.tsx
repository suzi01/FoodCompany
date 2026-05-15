import Graph from '@/assets/graph.svg';
import { Card } from '@/components/common/Card';
import { Heading } from '@/components/common/Heading';
import { Image } from '@/components/common/Image';
import { Table } from '@/components/common/Table/Table';
import { LineChart } from '@mantine/charts';
import { RingProgress, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

const transactions = [
  {
    TransactionID: '123456789',
    ProductName: 'Apple',
    Customer: 'John Doe',
    Amount: '$12.99',
    Status: 'Completed',
    Date: '2024-06-15',
  },
  {
    TransactionID: '987654321',
    ProductName: 'Banana',
    Customer: 'Jane Smith',
    Amount: '$8.49',
    Status: 'Pending',
    Date: '2024-06-14',
  },
  {
    TransactionID: '456789123',
    ProductName: 'Carrot',
    Customer: 'Alice Johnson',
    Amount: '$5.75',
    Status: 'Completed',
    Date: '2024-06-13',
  },
];
const lineGraphData = [
  { date: 'Jan', temperature: -25 },
  { date: 'Feb', temperature: -10 },
  { date: 'Mar', temperature: 5 },
  { date: 'Apr', temperature: 15 },
  { date: 'May', temperature: 30 },
  { date: 'Jun', temperature: 15 },
  { date: 'Jul', temperature: 30 },
  { date: 'Aug', temperature: 40 },
  { date: 'Sep', temperature: 15 },
  { date: 'Oct', temperature: 20 },
  { date: 'Nov', temperature: 0 },
  { date: 'Dec', temperature: -10 },
];

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
            Temperature Overview
          </Heading>
          <p className="pb-4">Real time user engagement</p>
          <LineChart
            h={250}
            data={lineGraphData}
            series={[{ name: 'temperature', label: 'Avg. Temperature' }]}
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
            yAxisProps={{ domain: [-25, 40] }}
            valueFormatter={(value) => `${value}°C`}
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
