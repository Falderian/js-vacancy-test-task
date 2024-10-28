import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Flex, Pill, Stack, Text } from '@mantine/core';

import { IProduct } from 'resources/product/product.api';

import ProductCard from './ProductCard';
import ProductsSortMenu from './ProductsSortMenu';

type Props = {
  data: {
    count: number;
    pagesCount: number;
    results: IProduct[];
  };
};

const ProductsList = ({ data }: Props) => {
  const router = useRouter();
  const { query } = router;
  const { min, max } = query;

  const pricePill = useCallback(() => {
    if (!min && !max) return '';
    const effectiveMin = min || 0;
    const effectiveMax = max;

    let text;
    if (effectiveMax !== undefined)
      text = effectiveMin === 0 ? `$0 - $${effectiveMax}` : `$${effectiveMin} - $${effectiveMax}`;
    else text = `$${effectiveMin}`;

    const handleClick = () => {
      const newQuery = { ...query };
      delete newQuery.min;
      delete newQuery.max;
      delete newQuery.search;
      router.push({ query: newQuery }, undefined, { shallow: true });
    };

    return (
      <Pill withRemoveButton w="fit-content" bg="white" size="md" onRemove={handleClick}>
        {text}
      </Pill>
    );
  }, [min, max]);

  return (
    <Stack miw="100%">
      <Flex justify="space-between">
        <Text fw={700}>{data.count} results</Text>
        <ProductsSortMenu />
      </Flex>
      {pricePill()}
      <Flex
        gap={20}
        wrap="wrap"
        justify="flex-start"
        w="100%"
        mah={{ base: '50vh', sm: '63vh' }}
        style={{ overflow: 'auto' }}
      >
        {data.count ? (
          data.results.map((prod) => <ProductCard key={prod._id} product={prod} />)
        ) : (
          <Text>No results were found</Text>
        )}
      </Flex>
    </Stack>
  );
};

export default ProductsList;
