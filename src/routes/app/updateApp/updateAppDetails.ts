import type { AppRequestware } from "@app/db";
import { formatLanguageList } from "@appUtils/format/formatLanguageList";
import { formatThemeList } from "@appUtils/format/formatThemeList";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateAppDetails: AppRequestware = async (req, res, next) => {
  try {
    // key variables
    const { theme, language, locale, appName, logo, email } = req.body;
    // update appname
    req.apps.appName = appName;
    // req.asset middleware yields asset url
    req.apps.logo = req.asset || logo;
    req.apps.locale = locale;
    req.apps.email = email;
    req.apps.themeList = formatThemeList(theme);
    req.apps.languageList = formatLanguageList(language);
    await req.apps.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit app details");
  }
};
