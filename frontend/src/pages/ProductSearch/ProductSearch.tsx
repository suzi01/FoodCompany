import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { SearchBar } from '@/components/common/SearchBar';
import { Table } from '@/components/common/Table/Table/Table';
import { TableFilter } from '@/components/common/Table/TableFilter';
import { useSearchProducts } from '@/services/Products/Products';
import { Loader } from '@mantine/core';
import { Pagination } from '@/components/common/Pagination';

export const ProductSearch = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams[0].get('productName') || '',
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
    data: products,
    isLoading,
    error,
  } = useQuery(useSearchProducts(location.search));

  // console.log('data', products);

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText(searchText);
    searchParams[1](`productName=${searchText}`);
  };

  const handleSetPaginationPage = (page: number) => {
    searchParams[1](`productName=${searchText}&page=${page}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <SearchBar
        handleSubmit={onSearchSubmit}
        text={searchText}
        placeholder="Search products..."
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
            filterItems={['Barcode', 'Category', 'Supplier']}
            sortItems={['Supplier','Price','Category']}
            orderItems={[
              { label: 'Ascending', value: 'asc' },
              { label: 'Descending', value: 'desc' },
            ]}
          />
          <div className="flex flex-col gap-4 justify-center items-center w-full bg-white p-5 border border-gray-300 rounded-md shadow-sm">
            <Table
              actions={true}
              columns={[
                { key: 'name', label: 'Product Name' },
                { key: 'category', label: 'Category' },
                { key: 'supplier', label: 'Supplier' },
                { key: 'price', label: 'Price' },
              ]}
              rows={products?.data ?? []}
            />
            <Pagination
              setCurrentPage={handleSetPaginationPage}
              currentPage={products?.currentPage ?? paginationPage}
              totalPages={products?.totalPages ?? 1}
              siblingCount={1}
            />
          </div>
        </>
      )}
      {error && (
        <div className="mt-3 m-auto">
          An error occured while fetching products. Please try again
        </div>
      )}
    </div>
  );
};
