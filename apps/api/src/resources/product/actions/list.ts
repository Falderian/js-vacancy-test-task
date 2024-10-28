import { validateMiddleware } from 'middlewares';

import { PaginationParams, productsPaginationSchema } from 'schemas/src/product.schema';
import { AppKoaContext, AppRouter } from 'types';

import productService from '../product.service';

const list = async (ctx: AppKoaContext<PaginationParams>) => {
  const { page, sort } = ctx.validatedData;
  const filterOptions: Record<string, any> = {};
  const sortOptions: Record<string, number> = {};
  const perPage = +(ctx.query.perPage || 6);
  const { min, max, title } = ctx.query;

  if (title) filterOptions.title = { $regex: title, $options: 'i' };
  if (min || max) {
    filterOptions.price = {};
    if (min) filterOptions.price.$gte = Number(min);
    if (max) filterOptions.price.$lte = Number(max);
  }

  switch (sort) {
    case 'newest':
      sortOptions.createdOn = -1;
      break;
    case 'oldest':
      sortOptions.createdOn = 1;
      break;
    case 'cheap':
      sortOptions.price = 1;
      break;
    case 'expensive':
      sortOptions.price = -1;
      break;
    default:
      break;
  }

  sortOptions._id = 1;

  const { results, totalItems } = await productService.findProducts(filterOptions, +page, perPage, sortOptions);

  ctx.body = {
    page,
    perPage,
    totalItems,
    totalPages: Math.ceil(totalItems / perPage),
    products: results,
  };
};

export default (router: AppRouter) => {
  router.get('/', validateMiddleware(productsPaginationSchema), list);
};
