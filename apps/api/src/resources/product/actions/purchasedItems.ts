import { AppKoaContext, AppRouter } from '../../../types';
import { userService } from '../../user';
import boughtProductsService from '../boughtProducts.service';

const getUserPurchasedProducts = async (ctx: AppKoaContext<{ userId: string }>) => {
  const { userId } = ctx.query;
  try {
    const user = await userService.findUser(userId as string);
    if (!user) throw new Error('User not found');
    const purchasedItems = await boughtProductsService.getUserPurchasedItems(userId as string);
    ctx.body = purchasedItems;
  } catch (err: any) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
};

export default (router: AppRouter) => {
  router.get('/history', getUserPurchasedProducts);
};
