import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { SearchBar } from '@/components/common/SearchBar';
import { Table } from '@/components/common/Table/Table/Table';
import { TableFilter } from '@/components/common/Table/TableFilter';
import { Loader } from '@mantine/core';
import { Pagination } from '@/components/common/Pagination';
import { useSearchSuppliers } from '@/services/Suppliers/Supplier';

export const SupplierSearch = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams[0].get('companyName') || '',
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
    data: suppliers,
    isLoading,
    error,
  } = useQuery(useSearchSuppliers(location.search));

  const handleSetFilterStatus = (status: string) => {
    setFilterStatus(status);
    const statusQuery = status !== 'All' ? `&status=${status}` : '';
    searchParams[1](`companyName=${searchText}${statusQuery}`);
  };

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText(searchText);
    const statusQuery = filterStatus !== 'All' ? `&status=${filterStatus}` : '';
    searchParams[1](`companyName=${searchText}${statusQuery}`);
  };

  const handleSetPaginationPage = (page: number) => {
    const statusQuery = filterStatus !== 'All' ? `&status=${filterStatus}` : '';
    searchParams[1](`companyName=${searchText}${statusQuery}&page=${page}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <SearchBar
        handleSubmit={onSearchSubmit}
        text={searchText}
        placeholder="Search company name..."
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
            hasStatusFilter={true}
            filterItems={['Products']}
            sortItems={['Company Name', 'Email', 'Status']}
            orderItems={[
              { label: 'A-Z', value: 'asc' },
              { label: 'Z-A', value: 'desc' },
            ]}
            filteredStatus={filterStatus}
            setFilterStatus={handleSetFilterStatus}
          />
          <div className="flex flex-col gap-4 justify-center items-center w-full bg-white p-5 border border-gray-300 rounded-md shadow-sm">
            <Table
              actions={true}
              columns={[
                { key: 'companyName', label: 'Company Name' },
                { key: 'status', label: 'Status' },
                { key: 'email', label: 'Company Email' },
                { key: 'phoneNumber', label: 'Company Phone' },
                { key: 'products', label: 'Products' },
              ]}
              rows={suppliers?.data ?? []}
            />
            <Pagination
              setCurrentPage={handleSetPaginationPage}
              currentPage={suppliers?.currentPage ?? paginationPage}
              totalPages={suppliers?.totalPages ?? 1}
              siblingCount={1}
            />
          </div>
        </>
      )}
      {error && (
        <div className="mt-3 m-auto">
          An error occured while fetching suppliers. Please try again
        </div>
      )}
    </div>
  );
};
