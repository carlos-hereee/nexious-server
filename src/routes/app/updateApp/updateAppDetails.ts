const formatLanguageList = require("../../../utils/app/format/formatLanguageList");
const formatThemeList = require("../../../utils/app/format/formatThemeList");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
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
    req.app.languageList = formatLanguageList(language, locale);
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit app details");
  }
};
