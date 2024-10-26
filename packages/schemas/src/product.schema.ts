import z from 'zod';
import dbSchema from './db.schema';

export const productSchema = dbSchema
  .extend({
    title: z.string().min(1, 'Please enter a product title').max(200, 'Title is too long'),
    price: z.number().min(0, 'Price must be a positive number'),
    photo: z.string().url('Photo must be a valid URL').optional(),
  })
  .strip();

export const productsPaginationSchema = z.object({
  page: z.string().min(1).default('1'),
  sort: z.enum(['newest', 'oldest', 'cheap', 'expensive']).default('newest'),
  filter: z
    .object({
      title: z.string().optional(),
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
    })
    .optional(),
});

export type PaginationParams = z.infer<typeof productsPaginationSchema>;
