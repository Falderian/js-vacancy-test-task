import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TextInput, ActionIcon } from '@mantine/core';
import { IconSearch, IconSelector, IconX } from '@tabler/icons-react';

const Search = () => {
  const router = useRouter();
  const { query } = router;
  const [search, setSearch] = useState(query.search || '');

  useEffect(() => {
    const newQuery = { ...query };

    if (search) newQuery.search = search;
    else delete newQuery.search;

    router.push({ query: newQuery }, undefined, { shallow: true });
  }, [search]);

  return (
    <TextInput
      w="100%"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      leftSection={<IconSearch size={16} />}
      rightSection={
        <ActionIcon onClick={() => setSearch('')} style={{ backgroundColor: 'transparent' }}>
          <IconX color="gray" size={16} />
        </ActionIcon>
      }
      rightSectionWidth={40}
    />
  );
};

export default Search;
