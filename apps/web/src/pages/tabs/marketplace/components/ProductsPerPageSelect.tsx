import React from 'react';
import { useRouter } from 'next/router';
import { Select } from '@mantine/core';

const ProductsPerPageSelect = () => {
  const router = useRouter();
  const { query } = router;
  const selectedValue = query.perPage || '5';

  const handleChange = (v: string | null) => {
    if (!v || v === selectedValue) return;
    router.push({ query: { ...query, perPage: v, page: 1 } }, undefined, { shallow: true });
  };

  return (
    <Select
      checkIconPosition="right"
      label="Per page"
      data={['6', '12', '18'].map((value) => ({
        value,
        label: value,
        disabled: value === selectedValue,
      }))}
      value={selectedValue as string}
      onChange={handleChange}
    />
  );
};

export default ProductsPerPageSelect;
