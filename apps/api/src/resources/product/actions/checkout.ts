import { AppKoaContext, AppRouter } from 'types';
import Stripe from 'stripe';
import { boughtProductsSchema } from 'schemas/src/purchase.schema';
import { z } from 'zod';
import boughtProductsService from '../boughtProducts.service';

const stripe = new Stripe(process.env.STRIPE_KEY || '');

type BoughtItemParams = z.infer<typeof boughtProductsSchema>;

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
      success_url: `${process.env.API_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.API_URL}/cancel`,
    });

    await boughtProductsService.saveBoughtItems(userId as string, items);

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
