import { Button, Flex, Image, Stack, Text } from '@mantine/core';

type Product = {
  title: string;
  price: number;
  image: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Stack bg="white" pb={12} style={{ borderRadius: 12 }} maw="30%" bd="1px #ECECEE solid">
      <Image
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
        h={200}
        w="auto"
        fit="contain"
        radius="md"
      />
      <Stack px={18}>
        <Text size="lg" fw={700}>
          {product.title}
        </Text>
        <Flex justify="space-between">
          <Text color="grey" size="sm">
            Price:{' '}
          </Text>
          <Text fw={700}>${product.price}</Text>
        </Flex>

        <Button>Add to cart</Button>
      </Stack>
    </Stack>
  );
};

export default ProductCard;
