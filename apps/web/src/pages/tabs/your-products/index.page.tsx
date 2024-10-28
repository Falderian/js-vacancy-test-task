import React from 'react';
import { useRouter } from 'next/router';
import { Card, Flex, Loader, LoadingOverlay, Stack, Text, useMantineTheme } from '@mantine/core';
import { IconCirclePlusFilled } from '@tabler/icons-react';

import { accountApi } from 'resources/account';
import { useUserProducts } from 'resources/product/product.api';

import YourProductCard from 'components/YourProductCard';

const YourProducts = () => {
  const theme = useMantineTheme();
  const { push } = useRouter();
  const { data: account } = accountApi.useGet();

  const { data, refetch, isLoading } = useUserProducts(account?._id || '');

  const handleNewProductClick = () => push('your-products/new');

  return (
    <Stack mah="80vh" style={{ overflow: 'auto' }}>
      <Text size="lg" fw={600}>
        Your products
      </Text>
      <LoadingOverlay visible={isLoading} />
      <Flex wrap="wrap" gap={20}>
        <Card
          miw={230}
          mih={300}
          style={{ alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          onClick={handleNewProductClick}
        >
          <IconCirclePlusFilled color={theme.colors.blue[6]} size={40} />
          <Text fw={400} size="lg" c={theme.colors.blue[6]}>
            New Product
          </Text>
        </Card>
        {data?.products &&
          data.products.map((product) => <YourProductCard key={product._id} product={product} refetch={refetch} />)}
      </Flex>
    </Stack>
  );
};

export default YourProducts;
