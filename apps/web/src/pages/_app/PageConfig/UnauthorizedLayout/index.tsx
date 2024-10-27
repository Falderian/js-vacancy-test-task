import { Center, Image, SimpleGrid, Stack } from '@mantine/core';
import { FC, ReactElement } from 'react';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => (
  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
    <Center component="main" h="100vh" w="100%" px={32}>
      {children}
    </Center>

    <Stack p={8} align="flex-end" justify="center">
      <Image src="/images/ship.svg" alt="Image alt" style={{ maxWidth: '100%', height: 'auto' }} />
    </Stack>
  </SimpleGrid>
);

export default UnauthorizedLayout;
