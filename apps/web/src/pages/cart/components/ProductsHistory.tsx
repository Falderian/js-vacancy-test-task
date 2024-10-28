import React from 'react';
import { Flex, Image, Loader, Table, Text } from '@mantine/core';

import { accountApi } from 'resources/account';
import { useHistory } from 'resources/product/product.api';

import SummaryBlock from './SummaryBlock';

const ProductsHistory = () => {
  const { data: account } = accountApi.useGet();

  const { data, isLoading } = useHistory(account!._id);

  if (isLoading) return <Loader />;

  if (!data || !data.count)
    return (
      <Text>
        You haven&apos;t made any purchases yet. <br /> Go to the marketplace and make purchases.
      </Text>
    );

  let total = 0;

  const rows = data?.results.map((product) => {
    total += product.totalPrice;
    return (
      <Table.Tr key={product._id}>
        <Table.Td w="15%">
          <Image src={product.image} fallbackSrc="/images/empty_state.png" maw={80} />
        </Table.Td>
        <Table.Td fw={700}>{product.title}</Table.Td>
        <Table.Td w="10%">${product.price}</Table.Td>
        <Table.Td w="10%">{product.quantity}</Table.Td>
        <Table.Td w="10%">${product.totalPrice}</Table.Td>
        <Table.Td w="15%">{new Date(product.boughtOn).toLocaleString()}</Table.Td>
      </Table.Tr>
    );
  });
  return (
    <Flex gap={80} style={{ overflow: 'auto' }} mah="80vh" pt={32}>
      <Table border={0} highlightOnHover withRowBorders>
        <Table.Thead>
          <Table.Tr c="gray">
            <Table.Th fw={400}>Item</Table.Th>
            <Table.Th />
            <Table.Th fw={400}>Unit Price</Table.Th>
            <Table.Th fw={400}>Quantity</Table.Th>
            <Table.Th fw={400}>Total Price</Table.Th>
            <Table.Th fw={400}>Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <SummaryBlock sum={total} isButton={false} />
    </Flex>
  );
};

export default ProductsHistory;
