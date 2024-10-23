import { productSchema } from 'schemas/src/product.schema';
import { AppKoaContext, AppRouter } from 'types';
import { validateMiddleware } from '../../../middlewares';
import productService from '../product.service';

async function handler(ctx: AppKoaContext) {
  const productData = ctx.validatedData;

  const product = await productService.insertOne(productData);
  ctx.body = productService.getPublic(product);
}

export default (router: AppRouter) => {
  router.post('/products', validateMiddleware(productSchema), handler);
};
