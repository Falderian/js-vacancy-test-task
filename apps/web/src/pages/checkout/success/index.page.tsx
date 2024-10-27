import { Button, Image, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCart } from '../../../contexts/cart.context';

const SuccessPage = () => {
  const { clearCart } = useCart();
  const { push } = useRouter();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Stack w="100%" h="60vh" align="center" justify="center">
      <Stack align="center" bg="white" w="fit-content" px={75} py={20}>
        <Image src="/images/success.svg" maw={60} />
        <Text size="26px" fw={600}>
          Payment Successfull
        </Text>
        <Text c="gray">Hooray, you have completed your payment!</Text>
        <Button onClick={() => push('/cart')}>Back to Cart</Button>
      </Stack>
    </Stack>
  );
};

export default SuccessPage;
