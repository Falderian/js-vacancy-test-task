import compose from 'koa-compose';
import mount from 'koa-mount';

import { accountRoutes } from 'resources/account';
import { userRoutes } from 'resources/user';

import { AppKoa } from 'types';

import auth from './middlewares/auth.middleware';
import productRoutes from '../resources/product/product.routes';

export default (app: AppKoa) => {
  app.use(mount('/account', compose([auth, accountRoutes.privateRoutes])));
  app.use(mount('/users', compose([auth, userRoutes.privateRoutes])));
  app.use(mount('/products', compose([auth, productRoutes.privateRoutes])));
};
