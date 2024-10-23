import React, { FC, useEffect, useState } from 'react';
import { Input, Stack, Text, Flex } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

import { debounce } from 'lodash';
import { useRouter } from 'next/router';

const Filters = () => {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const newQuery = { ...query };
    if (min) newQuery.min = min;
    else delete newQuery.min;

    if (max) newQuery.max = max;
    else delete newQuery.max;

    router.push({ query: newQuery }, undefined, { shallow: true });
  }, [min, max]);

  const resetFilters = () => {
    setMin('');
    setMax('');
  };

  return (
    <Stack bg="white" maw="fit-content" p={20} style={{ borderRadius: 12 }} bd="1px #ECECEE solid">
      <Flex align="center" justify="space-between">
        <Text size="xl" fw={600}>
          Filters
        </Text>
        <Flex align="center" justify="center" gap={4} style={{ cursor: 'pointer' }} onClick={resetFilters}>
          <Text color="gray" size="sm" span>
            Reset All
          </Text>
          <IconX color="gray" size={16} />
        </Flex>
      </Flex>
      <Stack>
        <Text size="lg" fw={600}>
          Price
        </Text>
        <Input
          type="number"
          name="min"
          leftSection="From:"
          leftSectionWidth={60}
          rightSection="$"
          fw={500}
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <Input
          type="number"
          name="max"
          leftSection="To:"
          leftSectionWidth={60}
          rightSection="$"
          fw={500}
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
      </Stack>
    </Stack>
  );
};
export default Filters;
