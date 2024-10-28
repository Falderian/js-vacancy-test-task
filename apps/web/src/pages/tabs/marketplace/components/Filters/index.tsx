import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Stack, Text, TextInput } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const Filters = () => {
  const router = useRouter();
  const { query } = router;
  const [min, setMin] = useState(query.min || '');
  const [max, setMax] = useState(query.max || '');

  useEffect(() => {
    const newQuery = { ...query };
    if (min) newQuery.min = min;
    else delete newQuery.min;

    if (max) newQuery.max = max;
    else delete newQuery.max;

    router.push({ query: { ...newQuery, page: 1 } }, undefined, { shallow: true });
  }, [min, max]);

  const resetFilters = useCallback(() => {
    setMin('');
    setMax('');
  }, []);

  useEffect(() => {
    if (!query.min && !query.max) resetFilters();
  }, [query.min, query.max]);

  const inputs = useMemo(
    () => [
      {
        name: 'min',
        leftSection: 'From:',
        value: min,
        onChange: (e: ChangeEvent<HTMLInputElement>) => setMin(e.target.value),
      },
      {
        name: 'max',
        leftSection: 'To:',
        value: max,
        onChange: (e: ChangeEvent<HTMLInputElement>) => setMax(e.target.value),
      },
    ],
    [min, max],
  );

  return (
    <Stack bg="white" maw="fit-content" p={20} style={{ borderRadius: 12 }} bd="1px #ECECEE solid">
      <Flex align="center" justify="space-between">
        <Text size="xl" fw={600}>
          Filters
        </Text>
        <Flex align="center" justify="center" gap={4} style={{ cursor: 'pointer' }} onClick={resetFilters}>
          <Text c="gray" size="sm">
            Reset All
          </Text>
          <IconX color="gray" size={16} />
        </Flex>
      </Flex>
      <Stack>
        <Text size="lg" fw={600}>
          Price
        </Text>
        {inputs.map((input) => (
          <TextInput
            key={input.name}
            type="number"
            leftSectionWidth={60}
            rightSection="$"
            fw={500}
            {...input}
            w={{ sm: 150, md: 250 }}
          />
        ))}
      </Stack>
    </Stack>
  );
};
export default Filters;
