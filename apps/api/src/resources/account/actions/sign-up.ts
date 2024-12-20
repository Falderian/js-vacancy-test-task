import { userService } from 'resources/user';

import { validateMiddleware } from 'middlewares';
import { emailService } from 'services';
import { securityUtil } from 'utils';

import config from 'config';

import { signUpSchema } from 'schemas';
import { AppKoaContext, AppRouter, Next, SignUpParams, Template } from 'types';

async function validator(ctx: AppKoaContext<SignUpParams>, next: Next) {
  const { email } = ctx.validatedData;

  const isUserExists = await userService.exists({ email });

  ctx.assertClientError(!isUserExists, {
    email: 'User with this email is already registered',
  });

  await next();
}

async function handler(ctx: AppKoaContext<SignUpParams>) {
  const { email, password } = ctx.validatedData;

  const [hash, signupToken] = await Promise.all([securityUtil.getHash(password), securityUtil.generateSecureToken()]);

  const user = await userService.insertOne({
    email,
    fullName: `Full Name`,
    passwordHash: hash.toString(),
    isEmailVerified: true,
    signupToken,
  });

  await emailService.sendTemplate<Template.VERIFY_EMAIL>({
    to: user.email,
    subject: 'Please Confirm Your Email Address for Ship',
    template: Template.VERIFY_EMAIL,
    params: {
      firstName: 'User',
      href: `${config.API_URL}/account/verify-email?token=${signupToken}`,
    },
  });

  if (config.IS_DEV) {
    ctx.body = { signupToken };
    return;
  }

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.post('/sign-up', validateMiddleware(signUpSchema), validator, handler);
};
