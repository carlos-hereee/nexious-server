import getApp from "../../../db/models/app/getApp";
import { useGenericErrors } from "../../../utils/auth/useGenericErrors";

export const appList = async (req, res) => {
  try {
    const apps = await getApp({ all: true });
    return apps ? res.status(200).json(apps).end() : res.status(200).json([]).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured gettign all apps");
  }
};
