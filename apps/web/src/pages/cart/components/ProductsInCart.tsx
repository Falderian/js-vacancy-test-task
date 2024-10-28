import React from 'react';
import { Flex, Image, Table, Text } from '@mantine/core';
import { IconMinus, IconPlus, IconX } from '@tabler/icons-react';

import { useCart } from 'contexts/cart.context';

import SummaryBlock from './SummaryBlock';

const ProductsInCart = () => {
  const { cart, addToCart, removeFromCart, removeProduct } = useCart();

  const products = Object.values(cart);
  let sum = 0;

  const rows = products.map((product) => {
    sum += product.price * product.quantity;
    return (
      <Table.Tr key={product._id}>
        <Table.Td w="15%">
          <Image src={product.image} fallbackSrc="/images/empty_state.png" maw={80} />
        </Table.Td>
        <Table.Td fw={700}>{product.title}</Table.Td>
        <Table.Td w="10%">${product.price}</Table.Td>
        <Table.Td w="20%">
          <Flex c="gray" gap={8} align="center">
            <IconMinus size={16} onClick={() => removeFromCart(product._id)} cursor="pointer" />
            <Text c="black">{product.quantity}</Text>
            <IconPlus size={16} onClick={() => addToCart(product)} cursor="pointer" />
          </Flex>
        </Table.Td>
        <Table.Td w="10%">
          <Flex
            c="gray"
            align="center"
            gap={5}
            onClick={() => removeProduct(product._id)}
            style={{ cursor: 'pointer' }}
          >
            <IconX size={16} />
            <Text>Remove</Text>
          </Flex>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Flex gap={80}>
      <Table border={0} highlightOnHover withRowBorders>
        <Table.Thead>
          <Table.Tr c="gray">
            <Table.Th fw={400}>Item</Table.Th>
            <Table.Th />
            <Table.Th fw={400}>Unit Price</Table.Th>
            <Table.Th fw={400}>Quantity</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <SummaryBlock sum={sum} />
    </Flex>
  );
};

export default ProductsInCart;
