import { userService } from 'resources/user';

import { AppKoaContext, AppRouter } from 'types';

async function handler(ctx: AppKoaContext) {
  console.log('ctx from actions.get', ctx);
  console.log('ctx.state.user', ctx.state.user);
  console.log('userService.getPublic(ctx.state.user)', userService.getPublic(ctx.state.user));
  console.log('isShadow: ctx.state.isShadow,', { isShadow: ctx.state.isShadow });
  ctx.body = {
    ...userService.getPublic(ctx.state.user),
    isShadow: ctx.state.isShadow,
  };
}

export default (router: AppRouter) => {
  router.get('/', handler);
};
