import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stack, Tabs } from '@mantine/core';

import { useCart } from 'contexts/cart.context';

import CartEmptyState from './components/CartEmptyState';
import ProductsHistory from './components/ProductsHistory';
import ProductsInCart from './components/ProductsInCart';

import classes from './components/index.module.css';

type TTabs = 'my-cart' | 'history';

const Cart = () => {
  const { cart } = useCart();
  const itemsCount = Object.keys(cart).length;

  const router = useRouter();
  const { tab } = router.query;

  const defaultTab: TTabs = (tab as TTabs) || 'my-cart';

  const handleTabChange = (value: string | null) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: value },
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    if (!tab) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, tab: defaultTab },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [tab, defaultTab, router]);

  return (
    <Stack>
      <Tabs value={defaultTab} onChange={handleTabChange}>
        <Tabs.List className={classes.list}>
          <Tabs.Tab value="my-cart" className={classes.tab}>
            My Cart
          </Tabs.Tab>
          <Tabs.Tab value="history" className={classes.tab}>
            History
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="my-cart">
          <Stack pt={32}>{itemsCount ? <ProductsInCart /> : <CartEmptyState />}</Stack>
        </Tabs.Panel>

        <Tabs.Panel value="history">
          <ProductsHistory />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};

export default Cart;
