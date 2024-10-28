import React from 'react';
import { useRouter } from 'next/router';
import { Button, Image, Stack, Text } from '@mantine/core';

const CartEmptyState = () => {
  const { push } = useRouter();
  return (
    <Stack justify="center" align="center" pt="10%">
      <Image src="/images/empty_state.png" alt="Empty state" w={200} />
      <Text fw={700} fz="lg">
        Oops, there&apos;s nothing here yet!
      </Text>
      <Text ta="center" fz="sm" c="gray">
        You haven&apos;t made any purchases yet.
        <br />
        Go to the marketplace and make purchases.
      </Text>
      <Button onClick={() => push('tabs/marketplace')}>Go to marketplace</Button>
    </Stack>
  );
};

export default CartEmptyState;
