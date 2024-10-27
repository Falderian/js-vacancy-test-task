import { Card, Chip, Container, Flex, Image, Indicator, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { IYourProduct, useDeleteProduct } from '../resources/product/product.api';

interface Props {
  product: IYourProduct;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        products: IYourProduct[];
      },
      Error
    >
  >;
}

const YourProductCard = ({ product, refetch }: Props) => {
  const deleteMutation = useDeleteProduct();

  const statusBadge =
    product.status === 'Sold'
      ? { color: 'green', backgroundColor: '#E8F7F0', text: `Sold (${product.totalSoldQuantity})` }
      : { color: 'orange', backgroundColor: '#FEF4E6', text: product.status };

  const handleClick = () => deleteMutation.mutateAsync(product._id).then(refetch);

  return (
    <Card style={{ gap: 12, alignItems: 'space-around' }} w={230}>
      <Container p={0} m={0}>
        <Indicator
          label={
            <Flex py={5} h="100%" align="center" style={{ cursor: 'pointer' }} onClick={handleClick}>
              <IconTrash color="gray" />
            </Flex>
          }
          offset={30}
          color="white"
          radius="md"
          size="lg"
        >
          <Image src={product.image} fallbackSrc="/images/default_image.svg" radius="5px 5px 0 0" />
        </Indicator>
        <Chip
          color={statusBadge.color}
          variant="light"
          checked={true}
          styles={{
            label: { backgroundColor: statusBadge.backgroundColor },
            iconWrapper: { display: 'none' },
          }}
          style={{
            position: 'absolute',
            bottom: '38%',
            right: '10%',
            borderRadius: 12,
          }}
        >
          {statusBadge.text}
        </Chip>
      </Container>
      <Text size="lg" fw={700}>
        {product.title}
      </Text>
      <Flex justify="space-between">
        <Text color="grey" size="sm">
          Price:
        </Text>
        <Text fw={700}>${product.price}</Text>
      </Flex>
    </Card>
  );
};

export default YourProductCard;
