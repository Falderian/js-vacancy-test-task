import { Button, Flex, Image, Stack, Text } from '@mantine/core';
import { useCart } from '../../../../contexts/cart.context';
import { IProduct } from '../../../../resources/product/product.api';

const ProductCard = ({ product }: { product: IProduct }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const isInCart = Boolean(cart[product._id]);
  const quantity = isInCart ? cart[product._id].quantity : 0;

  return (
    <Stack bg="white" pb={12} style={{ borderRadius: 12 }} maw="30%" bd="1px #ECECEE solid">
      <Image
        src={product.image || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png'}
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

        {isInCart ? (
          <Flex align="center" justify="space-between" w="100%" gap={10}>
            <Button onClick={() => removeFromCart(product._id)} color="red" w="50%">
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
