import { DateValue } from '@mantine/dates';
import { useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import { ListParams, ListResult, SortOrder } from 'types';

export type ProductsListFilterParams = {
  createdOn?: {
    startDate: DateValue;
    endDate: DateValue;
  };
  price?: {
    min?: number;
    max?: number;
  };
};

export type ProductsListSortParams = {
  createdOn?: SortOrder;
  title?: SortOrder;
  price?: SortOrder;
};

export interface IProduct {
  _id: string;
  createdOn: string;
  updatedOn: string;
  title: string;
  price: number;
}

interface IProductsResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  products: {
    pagesCount: number;
    results: IProduct[];
    count: number;
  };
}

export type ProductsListParams = ListParams<ProductsListFilterParams, ProductsListSortParams>;

export const useList = <T extends ProductsListParams>(params: T) =>
  useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: () => apiService.get('/products', params),
  });
