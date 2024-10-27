import { purchasedProductSchema } from 'schemas/src/purchasedProduct.schema';
import Stripe from 'stripe';
import { AppKoaContext, AppRouter } from 'types';
import { z } from 'zod';
import purchasedProductsService from '../purchasedProduct.service';

const stripe = new Stripe(process.env.STRIPE_KEY || '');

type BoughtItemParams = z.infer<typeof purchasedProductSchema>;

const checkout = async (ctx: AppKoaContext<BoughtItemParams[]>) => {
  const { userId } = ctx.query;
  const items = ctx.request.body as (BoughtItemParams & { quantity: number })[];
  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.WEB_URL}/checkout/success`,
      cancel_url: `${process.env.WEB_URL}/checkout/error`,
    });
    await purchasedProductsService.purchaseItems(userId as string, items);

    ctx.body = { url: session.url };
  } catch (err: any) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
};

export default (router: AppRouter) => {
  router.post('/checkout', checkout);
};
