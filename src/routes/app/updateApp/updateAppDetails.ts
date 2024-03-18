import { AppRequest } from "@app/request";
// import { formatLanguageList } from "@utils/app/format/formatLanguageList";
import { formatThemeList } from "@utils/app/format/formatThemeList";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateAppDetails = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    // const { theme, language, locale, appName, logo, email } = req.body;
    const { theme, locale, appName, logo, email } = req.body;
    // update appname
    req.project.appName = appName;
    // req.asset middleware yields asset url
    req.project.logo = req.asset || logo;
    req.project.locale = locale;
    req.project.email = email;
    req.project.themeList = formatThemeList(theme);
    // req.project.languageList = formatLanguageList(language);
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit app details");
  }
};
