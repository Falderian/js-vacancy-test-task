import { z } from 'zod';

import { EMAIL_REGEX } from 'app-constants';

export const paginationSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(6),

  searchValue: z.string().optional(),

  sort: z
    .object({
      createdOn: z.enum(['asc', 'desc']).default('asc'),
    })
    .default({}),
});

export const emailSchema = z.string().toLowerCase().regex(EMAIL_REGEX, 'Email format is incorrect.');
export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/\d/, { message: 'Password must contain at least 1 number' })
  .regex(/[a-z]/, { message: 'Password must contain lowercase letters' })
  .regex(/[A-Z]/, { message: 'Password must contain uppercase letters' });
