import { Select } from '@mantine/core';
import { useRouter } from 'next/router';

const ProductsPerPageSelect = () => {
  const router = useRouter();
  const { query } = router;
  const selectedValue = query.perPage || '5';

  const handleChange = (v: string | null) => {
    if (!v || v === selectedValue) return;
    router.push({ query: { ...query, perPage: v } }, undefined, { shallow: true });
  };

  return (
    <Select
      checkIconPosition="right"
      label="Per page"
      data={['5', '10', '15'].map((value) => ({
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
