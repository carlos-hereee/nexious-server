import getApp from "@dbModels/app/getApp";

export = (req, res, next) => {
  const appIds = req.user.ownedApps;
  req.app = await getApp({ appIds });
  next();
};
