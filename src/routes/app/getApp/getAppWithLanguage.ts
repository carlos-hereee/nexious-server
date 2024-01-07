import { getApp } from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const getAppWithLanguage = async (req, res) => {
  try {
    const appName = req.params.appName;
    const locale = req.params.locale;
    const app = await getApp({ appName, locale });
    res.status(200).json({ app }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured fetching new language");
  }
};
