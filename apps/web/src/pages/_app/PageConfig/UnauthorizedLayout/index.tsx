import React, { FC, ReactElement } from 'react';
import { Box,Center, Flex, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => {
  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <Flex style={{ height: '100vh', overflow: 'hidden' }} direction={{ base: 'column', sm: 'row' }}>
      <Box style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 32px' }}>
        <Center component="main" style={{ width: '100%' }}>
          {children}
        </Center>
      </Box>

      {matches && (
        <Box
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Image
            src="/images/ship.svg"
            alt="The Shopy Store Image"
            style={{
              maxHeight: '100%',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      )}
    </Flex>
  );
};

export default UnauthorizedLayout;
