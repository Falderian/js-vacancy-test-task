import { Button, Card, Divider, Flex, Text } from '@mantine/core';
import { useRouter } from 'next/router';

type Props = {
  sum: number;
  isButton?: boolean;
};

const SummaryBlock = ({ sum, isButton = true }: Props) => {
  const { push } = useRouter();

  return (
    <Card miw="20%" style={{ gap: 32 }} h="fit-content">
      <Text fz="xl" fw={700}>
        Summary
      </Text>
      <Divider />
      <Flex justify="space-between">
        <Text c="gray">Total Price:</Text>
        <Text fw={600}>${sum.toFixed(2)}</Text>
      </Flex>
      {isButton && <Button onClick={() => push('/checkout')}>Proceed to Checkout</Button>}
    </Card>
  );
};

export default SummaryBlock;
