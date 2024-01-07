import removeApp from "@dbModels/app/removeApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const deleteApp = (req, res, next) => {
  try {
    const appId = req.params.appId;
    // if match remove from owned app
    const removeFromOwned = req.user.ownedApps.filter((data) => data.appId !== appId);
    req.user.ownedApps = removeFromOwned;
    await req.user.save();
    await removeApp({ appId });
    next();
    // const appList = await getApp({ all: true });
    // res.status(200).json({ user: req.user, appList }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured removing app");
  }
};