import { DateValue } from '@mantine/dates';
import { useMutation, useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import { ListParams, SortOrder } from 'types';

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
  image: string;
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

export type CreateProductData = {
  title: string;
  userId: string;
  image: File;
  price: number;
};

export interface IYourProduct {
  _id: string;
  title: string;
  price: number;
  userId: string;
  totalSoldQuantity: number;
  image: string | null;
  status: 'On sale' | 'Sold';
  quantity: number;
}

export type ProductsListParams = ListParams<ProductsListFilterParams, ProductsListSortParams>;

export const useList = <T extends ProductsListParams>(params: T) =>
  useQuery<IProductsResponse>({
    queryKey: ['products', params],
    queryFn: () => apiService.get('/products', params),
  });

export const useCheckout = (
  userId: string,
  items: Array<{ productId: string; title: string; price: number; quantity: number }>,
) => {
  return useQuery<{ url: string }>({
    queryKey: ['checkout', items],
    queryFn: () => apiService.post('/products/checkout', items, { params: { userId } }),
    enabled: items.length > 0,
  });
};

export const useHistory = (userId: string) => {
  return useQuery<{ count: string; results: any[] }>({
    queryKey: ['history', userId],
    queryFn: () => apiService.get('products/history', { userId }),
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiService.post<any, { url: string }>('products/new', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  });
};

export const useUserProducts = (userId: string) => {
  return useQuery<{ products: IYourProduct[] }>({
    queryKey: ['history', userId],
    queryFn: () => apiService.get('products/user', { userId }),
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await apiService.delete<any, any>(`products/${productId}`);
      return response.data;
    },
  });
};
