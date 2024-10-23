import list from './actions/list';
import { routeUtil } from '../../utils';

const privateRoutes = routeUtil.getRoutes([list]);

export default {
  privateRoutes,
};
