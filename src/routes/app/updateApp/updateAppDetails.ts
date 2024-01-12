import type { AppRequestware } from "@app/express";
import { formatLanguageList } from "@appUtils/format/formatLanguageList";
import { formatThemeList } from "@appUtils/format/formatThemeList";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateAppDetails: AppRequestware = async (req, res, next) => {
  try {
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
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit app details");
  }
};
