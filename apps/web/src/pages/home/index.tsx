import { Flex, Stack } from '@mantine/core';
import { NextPage } from 'next';

import { useRouter } from 'next/router';
import { useList } from '../../resources/product/product.api';
import Filters from './components/Filters';
import ProductsList from './components/ProductsList';
import ProductsPagination from './components/ProductsPagination';
import ProductsPerPageSelect from './components/ProductsPerPageSelect';
import Search from './components/Search';

const Home: NextPage = () => {
  const { query } = useRouter();

  const { min, max, search, page, perPage, sort } = query;

  const { data } = useList({
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
        {data && (
          <>
            <ProductsList data={data.products} />
            <Stack>
              <ProductsPerPageSelect />
              <ProductsPagination total={data.totalPages} />
            </Stack>
          </>
        )}
      </Stack>
    </Flex>
  );
};

export default Home;
