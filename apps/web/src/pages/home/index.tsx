import React from 'react';
import { NextPage } from 'next';
import { Flex } from '@mantine/core';

import Filters from './components/Filters';
import Search from './components/Search';
import { useList } from '../../resources/product/product.api';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { query } = useRouter();

  const { min, max, search } = query;

  const { data, error } = useList({
    price: { min, max },
    title: search,
  });

  return (
    <Flex gap={28}>
      <Filters />
      <Search />
    </Flex>
  );
};

export default Home;
