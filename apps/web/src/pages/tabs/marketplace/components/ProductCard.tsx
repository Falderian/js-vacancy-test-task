import React from 'react';
import { Button, Flex, Image, Stack, Text } from '@mantine/core';

import { IProduct } from 'resources/product/product.api';

import { useCart } from 'contexts/cart.context';

const ProductCard = ({ product }: { product: IProduct }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const isInCart = Boolean(cart[product._id]);
  const quantity = isInCart ? cart[product._id].quantity : 0;

  return (
    <Stack
      bg="white"
      pb={12}
      style={{ borderRadius: 12 }}
      maw="30%"
      bd="1px #ECECEE solid"
      justify="space-between"
      w={230}
    >
      <Stack align="center" justify="center" h="100%">
        <Image
          src={product.image}
          fallbackSrc="/images/empty_state.png"
          radius="5px 5px 0 0"
          loading="lazy"
          alt={`Picture of ${product.title}`}
        />
      </Stack>
      <Stack px={18}>
        <Text size="lg" fw={700}>
          {product.title}
        </Text>
        <Flex justify="space-between">
          <Text color="grey" size="sm">
            Price:
          </Text>
          <Text fw={700}>${product.price}</Text>
        </Flex>

        {isInCart ? (
          <Flex align="center" justify="space-between" w="100%" gap={10} direction={{ sm: 'row', base: 'column' }}>
            <Button onClick={() => removeFromCart(product._id)} color="red" w="50%" p={0}>
              Remove
            </Button>
            <Button onClick={() => addToCart(product)} opacity={0.5} w="50%" p={0}>
              In Cart({quantity})
            </Button>
          </Flex>
        ) : (
          <Button onClick={() => addToCart(product)}>Add to cart</Button>
        )}
      </Stack>
    </Stack>
  );
};

export default ProductCard;
