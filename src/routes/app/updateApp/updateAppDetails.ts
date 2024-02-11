import { AppRequest } from "@app/request";
import { formatLanguageList } from "@utils/app/format/formatLanguageList";
import { formatThemeList } from "@utils/app/format/formatThemeList";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateAppDetails = async (req: AppRequest, res: Response, next: NextFunction) => {
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
