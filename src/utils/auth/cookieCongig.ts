import type { CookieConfigProps } from "@app/auth.js";
import { isProduction } from "@appUtils/config.js";

export const cookieCongig: CookieConfigProps = (hour) => {
  const maxAge = hour === 0 ? 0 : Date.now() + hour * 60 * 60 * 1000;
  // TODO: research cookie configs
  return {
    maxAge,
    httpOnly: true,
    secure: isProduction || undefined,
    sameSite: isProduction ? "none" : undefined,
  };
};
