import getApp from "@dbModels/app/getApp";

export const getOwnedApps = (req, res, next) => {
  const appIds = req.user.ownedApps;
  req.app = await getApp({ appIds });
  next();
};
