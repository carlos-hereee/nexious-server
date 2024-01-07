import { getApp } from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const getAppList = async (req, res) => {
  try {
    const apps = await getApp({ all: true });
    return apps ? res.status(200).json(apps).end() : res.status(200).json([]).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured gettign all apps");
  }
};
