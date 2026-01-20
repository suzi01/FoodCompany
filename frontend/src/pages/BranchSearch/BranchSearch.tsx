import { SearchBar } from '@/components/common/SearchBar';
import { Table } from '@/components/common/Table/Table/Table';
import { TableFilter } from '@/components/common/Table/TableFilter';
import { useState } from 'react';

const data = [
  {
    id: '1',
    Status: 'Active',
    'Branch Name': 'Downtown Branch',
    Email: 'john.doe@example.com',
    'Phone Number': '123-456-7890',
    Address: '123 Main St, Anytown, USA',
    'Years Active': '5',
    Suppliers: 'Supplier A, Supplier B',
  },
  {
    id: '2',
    Status: 'Inactive',
    'Branch Name': 'Uptown Branch',
    Email: 'jane.smith@example.com',
    'Phone Number': '987-654-3210',
    Address: '456 Elm St, Othertown, USA',
    'Years Active': '2',
    Suppliers: 'Supplier C',
  },
  {
    id: '3',
    Status: 'Active',
    'Branch Name': 'Midtown Branch',
    Email: 'Some.email@example.com',
    'Phone Number': '555-555-5555',
    Address: '789 Oak St, Sometown, USA',
    'Years Active': '3',
    Suppliers: 'Supplier A, Supplier D',
  },
  {
    id: '4',
    Status: 'Pending',
    'Branch Name': 'Eastside Branch',
    Email: 'a@example.com',
    'Phone Number': '222-333-4444',
    Address: '321 Pine St, Newtown, USA',
    'Years Active': '1',
    Suppliers: 'Supplier E',
  },
  {
    id: '5',
    Status: 'Active',
    'Branch Name': 'Westside Branch',
    Email: 'westside@example.com',
    'Phone Number': '111-222-3333',
    Address: '654 Cedar St, Oldtown, USA',
    'Years Active': '4',
    Suppliers: 'Supplier B, Supplier F',
  },
  {
    id: '6',
    Status: 'Inactive',
    'Branch Name': 'Northside Branch',
    Email: 'another.email@example.com',
    'Phone Number': '444-555-6666',
    Address: '987 Spruce St, Smalltown, USA',
    'Years Active': '2',
    Suppliers: 'Supplier G',
  },
  {
    id: '7',
    Status: 'Pending',
    'Branch Name': 'Southside Branch',
    Email: 'southside@example.com',
    'Phone Number': '777-888-9999',
    Address: '159 Maple St, Bigtown, USA',
    'Years Active': '1',
    Suppliers: 'Supplier H',
  },
];

export const BranchSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('All');

  const onStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleClear = () => {
    setSearchText('');
  };

  const filteredData = () => {
    if (status === 'All') {
      return data.filter((item) =>
        item['Branch Name'].toLowerCase().includes(searchText.toLowerCase()),
      );
    }
    return data.filter(
      (item) =>
        item.Status.toLowerCase() === status.toLowerCase() &&
        item['Branch Name'].toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      filteredData();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <SearchBar
        text={searchText}
        onTextChange={handleTextChange}
        onClear={handleClear}
        onKeyDown={handleKeyDown}
        className="w-full"
      />
      <TableFilter
        filteredStatus={status}
        setFilterStatus={onStatusChange}
        filterItems={['Email', 'Contact Name', 'Supplier']}
      />
      <Table
        actions={true}
        headers={[
          'Status',
          'Branch Name',
          'Email',
          'Phone Number',
          'Address',
          'Years Active',
          'Suppliers',
        ]}
        rows={filteredData()}
      />
    </div>
  );
};
