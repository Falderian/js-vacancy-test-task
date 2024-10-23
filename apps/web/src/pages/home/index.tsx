import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Flex, Stack } from '@mantine/core';

import Filters from './components/Filters';
import Search from './components/Search';
import { useList } from '../../resources/product/product.api';
import { useRouter } from 'next/router';
import ProductsList from './components/ProductsList';

const Home: NextPage = () => {
  const { query } = useRouter();

  const { min, max, search, page } = query;

  const { data, error } = useList({
    price: { min, max },
    title: search,
    page: +(page || 1),
  });
  console.log(data);
  return (
    <Flex gap={28}>
      <Filters />
      <Stack w="100%">
        <Search />
        {data && <ProductsList data={data.products} />}
      </Stack>
    </Flex>
  );
};

export default Home;
