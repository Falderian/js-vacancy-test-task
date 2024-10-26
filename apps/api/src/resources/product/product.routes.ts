import list from './actions/list';
import { routeUtil } from '../../utils';
import checkout from './actions/checkout';
import purchasedItems from './actions/purchasedItems';

const privateRoutes = routeUtil.getRoutes([list, checkout, purchasedItems]);

export default {
  privateRoutes,
};
