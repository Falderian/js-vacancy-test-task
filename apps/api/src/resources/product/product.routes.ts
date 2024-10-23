import { AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';
import { paginationSchema } from 'schemas';
import list from './actions/list';

export default (router: AppRouter) => {
  router.get('/products', validateMiddleware(paginationSchema), list);
};
