import React, { useRouter } from 'next/router';
import { Button, Image, Stack, Text } from '@mantine/core';

const ErrorPage = () => {
  const { push } = useRouter();

  return (
    <Stack w="100%" h="60vh" align="center" justify="center">
      <Stack align="center" bg="white" w="fit-content" px={75} py={20}>
        <Image src="/images/error.svg" maw={60} />
        <Text size="26px" fw={600}>
          Payment Failed
        </Text>
        <Text c="gray">
          Sorry, your payment failed. <br /> Would you like to try again?
        </Text>
        <Button onClick={() => push('/cart')}>Back to Cart</Button>
      </Stack>
    </Stack>
  );
};

export default ErrorPage;
