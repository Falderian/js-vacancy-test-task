import { routeUtil } from 'utils';

import checkout from './actions/checkout';
import create from './actions/create';
import deleteProduct from './actions/deleteProduct';
import list from './actions/list';
import listUserProducts from './actions/listUserProducts';
import getUserPurchasedProducts from './actions/listUserPurchasedProducts';

const privateRoutes = routeUtil.getRoutes([
  list,
  listUserProducts,
  checkout,
  getUserPurchasedProducts,
  create,
  deleteProduct,
]);

export default {
  privateRoutes,
};
