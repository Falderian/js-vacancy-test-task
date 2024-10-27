import z from 'zod';

export const boughtProductsSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  title: z.string(),
  price: z.number().min(0),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  totalPrice: z.number().min(0),
  boughtOn: z.date().default(new Date()),
  image: z.string().url().optional(),
});

export const BoughtProductsParams = z.array(boughtProductsSchema);
