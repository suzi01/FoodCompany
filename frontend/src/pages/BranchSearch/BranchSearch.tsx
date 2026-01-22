import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { SearchBar } from '@/components/common/SearchBar';
import { Table } from '@/components/common/Table/Table/Table';
import { TableFilter } from '@/components/common/Table/TableFilter';
import { useSearchBranches } from '@/services/Branches/Branches';
import { Loader } from '@mantine/core';

export const BranchSearch = () => {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams[0].get('branchName') || '',
  );
  const location = useLocation();

  const { data: branches, isLoading } = useQuery(
    useSearchBranches(location.search),
  );

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText(searchText);
    searchParams[1](`branchName=${searchText}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <SearchBar
        handleSubmit={onSearchSubmit}
        text={searchText}
        placeholder="Search branches..."
        onTextChange={(text: string) => setSearchText(text)}
        onClear={() => setSearchText('')}
        className="w-full"
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader color="cyan" type="bars" />
        </div>
      ) : (
        <>
          <TableFilter
            hasStatusFilter={false}
            filterItems={['Branch Email', 'Contact Name', 'Supplier']}
          />
          <Table
            actions={true}
            headers={[
              'branchName',
              'mainContactName',
              'mainContactPhoneNumber',
              'mainContactEmail',
              'branchEmail',
              'phoneNumber',
              'address',
              'yearsActive',
              'suppliers',
            ]}
            rows={branches?.data ?? []}
          />
        </>
      )}
    </div>
  );
};
