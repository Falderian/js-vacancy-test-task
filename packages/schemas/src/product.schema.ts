import z from 'zod';
import dbSchema from './db.schema';

export const productSchema = dbSchema
  .extend({
    title: z.string().min(1, 'Please enter a product title').max(200, 'Title is too long'),
    price: z.number().min(0, 'Price must be a positive number'),
    photo: z.string().url('Photo must be a valid URL').optional(),
  })
  .strip();

export const boughtItemSchema = z.object({
  productId: z.string(),
  title: z.string(),
  price: z.number().min(0),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  totalPrice: z.number().min(0),
  boughtOn: z.date(),
});

export const purchaseHistorySchema = z.array(boughtItemSchema);

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  sort: z
    .object({
      title: z.enum(['asc', 'desc']).default('asc'),
    })
    .default({ title: 'asc' }),
  filter: z
    .object({
      title: z.string().optional(),
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
    })
    .optional(),
});

export type PaginationParams = z.infer<typeof paginationSchema>;
