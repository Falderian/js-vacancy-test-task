import { Flex, Stack, Text, Image, Button } from '@mantine/core';

type Product = {
  id: number;
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
        <Text>{product.title}</Text>
        <Flex justify="space-between">
          <Text color="grey">Price: </Text>
          <Text>{product.price}$</Text>
        </Flex>

        <Button>Add to cart</Button>
      </Stack>
    </Stack>
  );
};

export default ProductCard;
