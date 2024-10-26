import { Stack, Tabs } from '@mantine/core';
import CartEmptyState from './components/CartEmptyState';
import classes from './components/index.module.css';
import ProductsInCart from './components/ProductsInCart';
import { useCart } from '../../contexts/cart.context';
import ProductsHistory from './components/ProductsHistory';

const Cart = () => {
  const { cart } = useCart();
  const itemsCount = Object.keys(cart).length;

  return (
    <Stack>
      <Tabs defaultValue="my-cart">
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
