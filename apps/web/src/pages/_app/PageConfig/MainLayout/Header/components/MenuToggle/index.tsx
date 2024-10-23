import React, { forwardRef } from 'react';
import { Avatar, UnstyledButton, useMantineTheme } from '@mantine/core';

import { accountApi } from 'resources/account';

const MenuToggle = forwardRef<HTMLButtonElement>((props, ref) => {
  const { primaryColor } = useMantineTheme();

  const { data: account } = accountApi.useGet();

  if (!account) return null;

  return (
    <UnstyledButton ref={ref} {...props}>
      <Avatar src={account.avatarUrl} color={primaryColor} radius="xl">
        {account.email.slice(0, 2)}
      </Avatar>
    </UnstyledButton>
  );
});

MenuToggle.displayName = 'MenuToggle';

export default MenuToggle;
