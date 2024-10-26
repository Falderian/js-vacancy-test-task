import db from 'db';
import { DATABASE_DOCUMENTS } from 'app-constants';
import { productSchema } from 'schemas/src/product.schema';
import { Product } from 'app-types/src/product.types';
import _ from 'lodash';

const productService = db.createService<Product>(DATABASE_DOCUMENTS.PRODUCTS, {
  schemaValidator: (obj) => productSchema.parseAsync(obj),
});

const privateFields = ['deletedOn'];

const getPublic = (product: Product | null) => _.omit(product, privateFields);

const findProducts = async (filterOptions: Record<string, any>, page: number, perPage: number, sort: any) => {
  const [results, totalItems] = await Promise.all([
    productService.find(filterOptions, { page, perPage }, { sort }),
    productService.countDocuments(filterOptions),
  ]);

  return { results, totalItems };
};

export default Object.assign(productService, {
  getPublic,
  findProducts,
});
