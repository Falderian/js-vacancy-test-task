// src/resources/product/actions/list.ts
import { AppKoaContext } from 'types';
import productService from '../product.service';
import { paginationSchema } from 'schemas';
import { validateMiddleware } from 'middlewares';
import { PaginationParams } from 'schemas/src/product.schema';

const list = async (ctx: AppKoaContext<PaginationParams>) => {
  const { page, sort, filter } = ctx.validatedData;

  const filterOptions: Record<string, any> = {};

  if (filter) {
    if (filter.title) {
      filterOptions.title = { $regex: filter.title, $options: 'i' };
    }
    if (filter.minPrice) {
      filterOptions.price = { ...filterOptions.price, $gte: filter.minPrice };
    }
    if (filter.maxPrice) {
      filterOptions.price = { ...filterOptions.price, $lte: filter.maxPrice };
    }
  }

  const perPage = 6;
  const { results, totalItems } = await productService.findProducts(filterOptions, page, perPage, sort);

  ctx.body = {
    page,
    perPage,
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
    products: results,
  };
};

export default list;
