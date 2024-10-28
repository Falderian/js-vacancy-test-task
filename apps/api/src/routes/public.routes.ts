import mount from 'koa-mount';

import { accountRoutes } from 'resources/account';

import { AppKoa, AppRouter } from 'types';
import { productRoutes } from '../resources/product';
import { userRoutes } from '../resources/user';

const healthCheckRouter = new AppRouter();
healthCheckRouter.get('/health', (ctx) => {
  ctx.status = 200;
});

export default (app: AppKoa) => {
  app.use(healthCheckRouter.routes());
  app.use(mount('/account', accountRoutes.publicRoutes));
  app.use(mount('/account', accountRoutes.privateRoutes));
  app.use(mount('/users', userRoutes.privateRoutes));
  app.use(mount('/products', productRoutes.privateRoutes));
};
