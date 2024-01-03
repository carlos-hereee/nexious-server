import getApp from "../../../db/models/app/getApp";
import { useGenericErrors } from "../../../utils/auth/useGenericErrors";

export = async (req, res) => {
  try {
    // send owned apps
    const apps = await getApp({ ownerId: req.user._id });
    res.status(202).json(apps).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
