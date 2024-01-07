import getApp from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const getOwnedApps = async (req, res) => {
  try {
    // send owned apps
    const apps = await getApp({ ownerId: req.user._id });
    res.status(202).json(apps).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
