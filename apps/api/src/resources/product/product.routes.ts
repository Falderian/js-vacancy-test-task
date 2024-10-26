import list from './actions/list';
import { routeUtil } from '../../utils';
import checkout from './actions/checkout';
import purchasedItems from './actions/purchasedItems';
import create from './actions/create';

const privateRoutes = routeUtil.getRoutes([list, checkout, purchasedItems, create]);

export default {
  privateRoutes,
};
