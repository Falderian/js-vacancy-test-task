import { routeUtil } from '../../utils';
import buyProducts from './actions/buyProducts';
import checkout from './actions/checkout';
import create from './actions/create';
import deleteProduct from './actions/deleteProduct';
import list from './actions/list';
import listUserProducts from './actions/listUserProducts';

const privateRoutes = routeUtil.getRoutes([list, listUserProducts, checkout, buyProducts, create, deleteProduct]);

export default {
  privateRoutes,
};
