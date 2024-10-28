import { AppKoaContext, AppRouter } from 'types';

import productService from '../product.service';

const userProducts = async (ctx: AppKoaContext<{ userId: string }>) => {
  const { userId } = ctx.query;

  const products = await productService.findUserProducts(userId as string);

  ctx.body = {
    products,
  };
};

export default (router: AppRouter) => {
  router.get('/user', userProducts);
};
