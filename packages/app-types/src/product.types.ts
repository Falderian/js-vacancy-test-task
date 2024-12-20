import { productSchema } from 'schemas/src/product.schema';
import { z } from 'zod';

// Define the Product type
export type Product = z.infer<typeof productSchema>;

// Define types for other product-related operations
export type UpdateProductParams = z.infer<typeof productSchema>;
