import React, { useEffect, useMemo } from 'react';
import { useCart } from '../../contexts/cart.context';
import { useCheckout } from '../../resources/product/product.api';
import { accountApi } from '../../resources/account';
import { Image, Text, Stack, Button, Loader } from '@mantine/core';
import { useRouter } from 'next/router';

const CheckoutPage = () => {
  const { clearCart } = useCart();
  const { push } = useRouter();
  const { data: account } = accountApi.useGet();

  const { cart } = useCart();
  const products = useMemo(
    () =>
      Object.values(cart).map((prod) => ({
        productId: prod._id,
        title: prod.title,
        price: prod.price,
        quantity: prod.quantity,
        totalPrice: prod.price * prod.quantity,
        boughtOn: new Date(),
      })),
    [cart],
  );
  const { data, error, isLoading } = useCheckout(account!._id, products);

  useEffect(() => {
    if (data && !error) clearCart();
  }, [data, error]);

  return (
    <Stack pt={80} align="center" justify="center">
      {isLoading ? (
        <Loader />
      ) : (
        <Stack align="center" bg="white" w="fit-content" px={75} py={20}>
          {error ? (
            <>
              <Image src="/images/error.svg" maw={60} />
              <Text size="26px" fw={600}>
                Payment Failed
              </Text>
              <Text c="gray">
                Sorry, your payment failed. <br /> Would you like to try again?
              </Text>
            </>
          ) : (
            <>
              <Image src="/images/success.svg" maw={60} />
              <Text size="26px" fw={600}>
                Payment Successfull
              </Text>
              <Text c="gray">Hooray, you have completed your payment!</Text>
            </>
          )}

          <Button onClick={() => push('/cart')}>Back to Cart</Button>
        </Stack>
      )}
    </Stack>
  );
};

export default CheckoutPage;
