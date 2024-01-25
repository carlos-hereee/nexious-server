import type { RequestHandler } from "express";
import { formatLanguageList } from "@appUtils/format/formatLanguageList.js";
import { formatThemeList } from "@appUtils/format/formatThemeList.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";

export const updateAppDetails: RequestHandler = async (req, res, next) => {
  try {
    if (req.myApp) {
      // key variables
      const { theme, language, locale, appName, logo, email } = req.body;
      // update appname
      req.myApp.appName = appName;
      // req.asset middleware yields asset url
      req.myApp.logo = req.asset || logo;
      req.myApp.locale = locale;
      req.myApp.email = email;
      req.myApp.themeList = formatThemeList(theme);
      req.myApp.languageList = formatLanguageList(language);
      await req.myApp.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit app details");
  }
};
