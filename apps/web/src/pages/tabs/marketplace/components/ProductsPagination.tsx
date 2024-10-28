import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from '@mantine/core';

const ProductsPagination = ({ total }: { total: number }) => {
  const router = useRouter();
  const { query } = router;

  const initialPage = parseInt(query.page as string, 10) || 1;

  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const changePage = (v: number) => {
    router.push({ query: { ...query, page: v } }, undefined, { shallow: true });
    setPage(v);
  };

  return (
    <Pagination
      value={page}
      total={total}
      onChange={changePage}
      styles={{ control: { border: '1px #ECECEE solid' }, root: { flexWrap: 'wrap' } }}
    />
  );
};

export default ProductsPagination;
