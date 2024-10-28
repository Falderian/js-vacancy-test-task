import { ObjectId } from '@paralect/node-mongo';
import _ from 'lodash';
import z from 'zod';

import db from 'db';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { productSchema } from 'schemas/src/product.schema';

export type Product = z.infer<typeof productSchema>;

export const productService = db.createService<Product & any>(DATABASE_DOCUMENTS.PRODUCTS, {
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

const findById = async (id: string) => {
  try {
    const _id = new ObjectId(id);
    const product = await productService.findOne({ _id });

    if (!product) throw new Error('Product not found');

    return product;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Could not fetch product');
  }
};

const findUserProducts = async (userId: string) => {
  const productsWithStatus = await productService.aggregate([
    {
      $match: { userId },
    },
    {
      $lookup: {
        from: 'bought_products',
        let: { productId: { $toString: '$_id' } },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$productId', '$$productId'] },
            },
          },
        ],
        as: 'boughtDetails',
      },
    },
    {
      $addFields: {
        totalSoldQuantity: { $sum: '$boughtDetails.quantity' },
        totalRevenue: { $sum: '$boughtDetails.totalPrice' },
        hasSales: { $gt: [{ $size: '$boughtDetails' }, 0] },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        price: 1,
        userId: 1,
        image: { $ifNull: ['$image', null] },
        totalSoldQuantity: 1,
        totalRevenue: 1,
        status: {
          $cond: {
            if: { $gt: ['$totalSoldQuantity', 0] },
            then: 'Sold',
            else: 'On sale',
          },
        },
      },
    },
  ]);

  return productsWithStatus;
};

export default Object.assign(productService, {
  getPublic,
  findById,
  findProducts,
  findUserProducts,
});
