import React, { FC, memo } from 'react';
import Link from 'next/link';
import { Anchor, AppShell, Flex, Text } from '@mantine/core';

import { accountApi } from 'resources/account';

import { LogoImage } from 'public/images';

import { RoutePath } from 'routes';

import ShadowLoginBanner from './components/ShadowLoginBanner';
import AppTabs from '../../../../../components/Tabs/AppTabs';

const Header: FC = () => {
  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <AppShell.Header bg="transparent" bd="none" style={{ flexDirection: 'row', display: 'flex' }}>
      {account.isShadow && <ShadowLoginBanner email={account.email} />}

      <Anchor component={Link} href={RoutePath.Home} underline="never">
        <Flex px={40} py={30} gap={10} align="center">
          <LogoImage />
          <Text size="xl" c="black" fw={700} fz={24}>
            Shopy
          </Text>
        </Flex>
      </Anchor>
      <AppTabs />
    </AppShell.Header>
  );
};

export default memo(Header);
