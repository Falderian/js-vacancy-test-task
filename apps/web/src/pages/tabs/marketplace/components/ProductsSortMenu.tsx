import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Menu, Text } from '@mantine/core';
import { IconArrowsSort, IconChevronDown, IconChevronUp } from '@tabler/icons-react';

const ProductsSortMenu = () => {
  const router = useRouter();
  const { query } = router;
  const selectedValue = query.sort || 'newest';
  const [menuOpened, setMenuOpened] = useState(false);

  const handleChange = (value: string | null) => {
    if (!value || value === selectedValue) return;
    router.push({ query: { ...query, sort: value, page: 1 } }, undefined, { shallow: true });
  };

  return (
    <Flex align="center">
      <Menu onOpen={() => setMenuOpened(true)} onClose={() => setMenuOpened(false)}>
        <Menu.Target>
          <Flex align="center" gap={2} style={{ cursor: 'pointer' }}>
            <IconArrowsSort stroke={1} size={16} />
            <Text size="sm">Sort by</Text>
            <Text size="sm">{selectedValue}</Text>{' '}
            {menuOpened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
          </Flex>
        </Menu.Target>
        <Menu.Dropdown>
          {['newest', 'oldest', 'title asc', 'title desc'].map((value) => (
            <Menu.Item key={value} onClick={() => handleChange(value)} disabled={value === selectedValue}>
              {value}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default ProductsSortMenu;
