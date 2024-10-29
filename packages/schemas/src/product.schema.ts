import z from 'zod';

export const productSchema = z
  .object({
    title: z.string().min(1, 'Please enter a product title').max(200, 'Title is too long'),
    price: z.string().min(0, 'Price must be a positive number'),
    image: z.string().url('Image must be a valid URL').optional(),
    userId: z.string().min(1, 'User ID is required'),
    createdOn: z.date().default(new Date()),
  })
  .strip();

export const productsPaginationSchema = z.object({
  page: z.string().min(1).default('1'),
  sort: z.enum(['newest', 'oldest', 'title asc', 'title desc']).default('newest'),
  filter: z
    .object({
      title: z.string().optional(),
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
    })
    .optional(),
});

export type PaginationParams = z.infer<typeof productsPaginationSchema>;
