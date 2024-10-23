// src/resources/product/actions/list.ts
import { AppKoaContext, AppRouter } from 'types';
import productService from '../product.service';
import { paginationSchema } from 'schemas';
import { validateMiddleware } from 'middlewares';
import { PaginationParams } from 'schemas/src/product.schema';

const list = async (ctx: AppKoaContext<PaginationParams>) => {
  const { page, sort } = ctx.validatedData;
  const filterOptions: Record<string, any> = {};
  const { min, max } = ctx.query.price || {};
  const title = ctx.query.title;

  if (title) {
    filterOptions.title = { $regex: title, $options: 'i' };
  }

  if (min) {
    filterOptions.price = { ...filterOptions.price, $gte: Number(min) };
  }

  if (max) {
    filterOptions.price = { ...filterOptions.price, $lte: Number(max) };
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

export default (router: AppRouter) => {
  router.get('/', validateMiddleware(paginationSchema), list);
};
