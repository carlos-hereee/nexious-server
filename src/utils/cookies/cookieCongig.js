const { isProduction } = require("../../../config.env");

module.exports = (minutes) => {
  const maxAge = minutes === 0 ? 0 : Date.now() + minutes * 1000 * 60;
  return {
    maxAge,
    httpOnly: true,
    secure: isProduction || undefined,
    sameSite: isProduction ? "Lax" : undefined,
  };
};
