const removePage = require("../../../db/models/page/removePage");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    const { appId, pageId } = req.params;
    // remove page from app
    req.app.pages = req.app.pages.filter((page) => page.pageId !== pageId);
    await req.app.save();
    // finally remove page
    await removePage({ appId, pageId });
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to delete page");
  }
};
