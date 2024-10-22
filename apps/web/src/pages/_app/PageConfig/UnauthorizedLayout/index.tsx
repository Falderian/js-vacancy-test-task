import React, { FC, ReactElement } from 'react';
import { Center, Image, SimpleGrid, Stack } from '@mantine/core';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => (
  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
    <Center component="main" h="100vh" w="100%" px={32}>
      {children}
    </Center>

    <Stack p={8} mah="100vh" maw="50vw" justify="center">
      <Image src="/images/ship.svg" alt="Image alt" />
    </Stack>
  </SimpleGrid>
);

export default UnauthorizedLayout;
