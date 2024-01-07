import { isProduction } from "@config";

export = (hour: number) => {
  const maxAge = hour === 0 ? 0 : Date.now() + hour * 60 * 60 * 1000;
  return {
    maxAge,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : false,
  };
};
