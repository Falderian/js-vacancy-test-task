import z from 'zod';

import db from 'db';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { purchasedProductSchema } from 'schemas/src/purchasedProduct.schema';

type BoughtProduct = z.infer<typeof purchasedProductSchema>;
const boughtItemsService = db.createService(DATABASE_DOCUMENTS.BOUGHT_PRODUCTS);

const purchaseItems = async (userId: string, items: BoughtProduct[]) => {
  const boughtItemsData = items.map((item) => ({
    userId,
    productId: item.productId,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
    image: item.image,
  }));

  try {
    await boughtItemsService.insertMany(boughtItemsData);
  } catch (error) {
    console.error('Error saving bought items:', error);
    throw new Error('Unable to save bought items');
  }
};

const getUserPurchasedItems = async (userId: string) => {
  try {
    const purchasedItems = await boughtItemsService.find({ userId }, undefined, { sort: { createdOn: 'desc' } });

    return purchasedItems;
  } catch (error) {
    console.error('Error retrieving purchased items:', error);
    throw new Error('Unable to retrieve purchased items');
  }
};

export default {
  purchaseItems,
  getUserPurchasedItems,
};
