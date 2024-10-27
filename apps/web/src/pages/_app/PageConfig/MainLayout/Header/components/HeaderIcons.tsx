import { Flex, Indicator } from '@mantine/core';
import { IconLogout, IconShoppingCart } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCart } from '../../../../../../contexts/cart.context';
import { accountApi } from '../../../../../../resources/account';

const HeaderIcons = () => {
  const router = useRouter();
  const { mutate: signOut } = accountApi.useSignOut();

  const { cart, clearCart } = useCart();
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  useEffect(() => {
    const count = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(count);
  }, [cart]);

  const handleSignOut = () => {
    signOut();
    clearCart();
  };

  return (
    <Flex align="center" justify="center" pr={32} gap={32}>
      <Indicator label={cartItemCount} processing size={16}>
        <IconShoppingCart
          size={40}
          stroke={1}
          color={router.pathname === '/cart' ? 'var(--indicator-color)' : 'gray'}
          onClick={() => router.push('/cart?tab=my-cart')}
          cursor="pointer"
        />
      </Indicator>
      <IconLogout size={40} stroke={1} color="gray" onClick={handleSignOut} cursor="pointer" />
    </Flex>
  );
};

export default HeaderIcons;
