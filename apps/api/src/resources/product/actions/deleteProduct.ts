import { ObjectId } from '@paralect/node-mongo';

import { AppKoaContext, AppRouter } from 'types';

import productService from '../product.service';

async function deleteProductHandler(ctx: AppKoaContext) {
  const productId = ctx.params.id;

  const product = await productService.findById(productId);

  if (!product) {
    ctx.status = 404;
    ctx.body = { error: 'Product not found' };
    return;
  }
  try {
    const _id = new ObjectId(productId);
    const result = await productService.deleteOne({ _id });
    ctx.body = { message: `Product ${result?.title} has been deleted` };
  } catch (error) {
    console.error('Error deleting product from database:', error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete product from database' };
  }
}

export default (router: AppRouter) => {
  router.delete('/:id', deleteProductHandler);
};
