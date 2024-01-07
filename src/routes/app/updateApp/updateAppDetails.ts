import type { MiddlewareProps } from "@app/db";
import { formatLanguageList } from "@appUtils/format/formatLanguageList";
import { formatThemeList } from "@appUtils/format/formatThemeList";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateAppDetails: MiddlewareProps = async (req, res, next) => {
  try {
    // key variables
    const { theme, language, locale, appName, logo, email } = req.body;
    // update appname
    req.app.appName = appName;
    // req.asset middleware yields asset url
    req.app.logo = req.asset || logo;
    req.app.locale = locale;
    req.app.email = email;
    req.app.themeList = formatThemeList(theme);
    req.app.languageList = formatLanguageList(language);
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit app details");
  }
};
