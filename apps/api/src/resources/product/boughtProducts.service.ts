import { DATABASE_DOCUMENTS } from 'app-constants';
import db from 'db';
import { boughtProductsSchema } from 'schemas/src/purchase.schema';
import z from 'zod';

type BoughtProduct = z.infer<typeof boughtProductsSchema>;
const boughtItemsService = db.createService(DATABASE_DOCUMENTS.BOUGHT_PRODUCTS);

const saveBoughtItems = async (userId: string, items: BoughtProduct[]) => {
  console.log(items[0]);
  const boughtItemsData = items.map((item) => ({
    userId,
    productId: item.productId,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    totalPrice: item.totalPrice,
    boughtOn: new Date(item.boughtOn),
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
    const purchasedItems = await boughtItemsService.find({ userId }, undefined, { sort: { boughtOn: 'desc' } });
    console.log(purchasedItems);
    return purchasedItems;
  } catch (error) {
    console.error('Error retrieving purchased items:', error);
    throw new Error('Unable to retrieve purchased items');
  }
};

export default {
  saveBoughtItems,
  getUserPurchasedItems,
};
