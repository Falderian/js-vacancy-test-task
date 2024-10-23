import { Flex } from '@mantine/core';
import ProductCard from './ProductCard';

type Props = {
  data: {
    count: number;
    pagesCount: number;
    results: [];
  };
};
const ProductsList = ({ data }: Props) => {
  return (
    <Flex gap={20} wrap="wrap" justify="flex-start">
      {data.results.map((prod) => (
        <ProductCard key={prod._id} product={prod} />
      ))}
    </Flex>
  );
};

export default ProductsList;
