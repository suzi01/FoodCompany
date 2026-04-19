import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { SearchBar } from '@/components/common/SearchBar';
import { Table } from '@/components/common/Table/Table/Table';
import { TableFilter } from '@/components/common/Table/TableFilter';
import { useSearchBranches } from '@/services/Branches/Branches';
import { Loader } from '@mantine/core';
import { Pagination } from '@/components/common/Pagination';

export const BranchSearch = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams[0].get('branchName') || '',
  );
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = params.get('page');
    if (pageFromUrl) {
      setPaginationPage(Number(pageFromUrl));
    } else {
      setPaginationPage(1);
    }
  }, [location.search]);

  const {
    data: branches,
    isLoading,
    error,
  } = useQuery(useSearchBranches(location.search));

  // console.log('data', branches);

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText(searchText);
    searchParams[1](`branchName=${searchText}`);
  };

  const handleSetPaginationPage = (page: number) => {
    searchParams[1](`branchName=${searchText}&page=${page}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <SearchBar
        handleSubmit={onSearchSubmit}
        text={searchText}
        placeholder="Search branches..."
        onTextChange={(text: string) => setSearchText(text)}
        onClear={() => {
          setSearchText('');
          searchParams[1]('');
        }}
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
            sortItems={['Branch Name', 'Branch Email', 'Supplier Name']}
            orderItems={[
              { label: 'A-Z', value: 'asc' },
              { label: 'Z-A', value: 'desc' },
              { label: 'Newest', value: 'newest' },
              { label: 'Oldest', value: 'oldest' },
            ]}
          />
          <div className="flex flex-col gap-4 justify-center items-center w-full bg-white p-5 border border-gray-300 rounded-md shadow-sm">
            <Table
              actions={true}
              columns={[
                { key: 'branchName', label: 'Branch Name' },
                { key: 'branchEmail', label: 'Branch Email' },
                { key: 'phoneNumber', label: 'Branch Phone' },
                { key: 'address', label: 'Address' },
                { key: 'yearsActive', label: 'Years Active' },
                { key: 'suppliers', label: 'Suppliers' },
              ]}
              rows={branches?.data ?? []}
            />
            <Pagination
              setCurrentPage={handleSetPaginationPage}
              currentPage={branches?.currentPage ?? paginationPage}
              totalPages={branches?.totalPages ?? 1}
              siblingCount={1}
            />
          </div>
        </>
      )}
      {error && (
        <div className="mt-3 m-auto">
          An error occured while fetching branches. Please try again
        </div>
      )}
    </div>
  );
};
