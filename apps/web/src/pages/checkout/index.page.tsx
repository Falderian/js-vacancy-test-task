import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Loader, Stack } from '@mantine/core';

import { accountApi } from 'resources/account';
import { useCheckout } from 'resources/product/product.api';

import { useCart } from 'contexts/cart.context';

const CheckoutPage = () => {
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
        image: prod.image,
      })),
    [cart],
  );
  const { data, error, isLoading } = useCheckout(account!._id, products);

  useEffect(() => {
    if (data) push(data?.url);
  }, [data, error]);

  return (
    <Stack pt={80} align="center" justify="center">
      {isLoading && <Loader />}
    </Stack>
  );
};

export default CheckoutPage;
