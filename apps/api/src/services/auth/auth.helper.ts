import psl from 'psl';
import url from 'url';

import config from 'config';

import { COOKIES, TOKEN_SECURITY_EXPIRES_IN } from 'app-constants';
import { AppKoaContext } from 'types';

export const setTokenCookies = ({ ctx, accessToken }: { ctx: AppKoaContext; accessToken: string }) => {
  const parsedUrl = url.parse(config.WEB_URL);
  console.warn('parsedUrl', parsedUrl);
  console.log('config.WEB_URL', config.WEB_URL);
  if (!parsedUrl.hostname) {
    return;
  }

  const parsed = psl.parse(parsedUrl.hostname) as psl.ParsedDomain;
  const cookiesDomain = parsed.domain || undefined;
  console.log('parsed', parsed);
  console.log('cookiesDomain', cookiesDomain);
  console.log('Cookie set:', ctx.cookies.get(COOKIES.ACCESS_TOKEN));

  ctx.cookies.set(COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    domain: cookiesDomain,
    expires: new Date(Date.now() + TOKEN_SECURITY_EXPIRES_IN * 1000),
    sameSite: 'none',
    secure: true,
  });
};

export const unsetTokenCookies = (ctx: AppKoaContext) => {
  ctx.cookies.set(COOKIES.ACCESS_TOKEN, null);
};

export default {
  setTokenCookies,
  unsetTokenCookies,
};
