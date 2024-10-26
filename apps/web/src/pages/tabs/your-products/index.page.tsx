import { Card, Flex, Stack, Text, useMantineTheme } from '@mantine/core';
import { IconCirclePlusFilled } from '@tabler/icons-react';
import { useRouter } from 'next/router';

const YourProducts = () => {
  const theme = useMantineTheme();
  const { push } = useRouter();

  const handleNewProductClick = () => push('your-products/new');

  return (
    <Stack>
      <Text size="lg" fw={600}>
        Your products
      </Text>
      <Flex>
        <Card
          miw={200}
          mih={200}
          style={{ alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          onClick={handleNewProductClick}
        >
          <IconCirclePlusFilled color={theme.colors.blue[6]} size={40} />
          <Text fw={400} size="lg" c={theme.colors.blue[6]}>
            New Product
          </Text>
        </Card>
      </Flex>
    </Stack>
  );
};

export default YourProducts;
