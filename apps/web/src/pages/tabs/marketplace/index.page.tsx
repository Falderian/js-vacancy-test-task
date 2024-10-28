import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Loader, Stack, Text } from '@mantine/core';

import { useList } from 'resources/product/product.api';

import Filters from './components/Filters';
import ProductsList from './components/ProductsList';
import ProductsPagination from './components/ProductsPagination';
import ProductsPerPageSelect from './components/ProductsPerPageSelect';
import Search from './components/Search';

const Marketplace = () => {
  const { query } = useRouter();

  const { min, max, search, page, perPage, sort } = query;

  const { data, isLoading } = useList({
    min,
    max,
    title: search,
    page: +(page || 1),
    perPage: +(perPage || 6),
    sort: sort?.toString() || 'newest',
  });

  return (
    <Flex gap={28}>
      <Filters />
      <Stack w="100%" align="center">
        <Search />

        {isLoading && <Loader />}

        {!isLoading && data?.totalItems ? (
          <>
            <ProductsList data={data.products} />
            <Stack>
              <ProductsPerPageSelect />
              <ProductsPagination total={data.totalPages} />
            </Stack>
          </>
        ) : (
          !isLoading && <Text>No results were found</Text>
        )}
      </Stack>
    </Flex>
  );
};

export default Marketplace;
