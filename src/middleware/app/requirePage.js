const useGenericErrors = require("../../utils/auth/useGenericErrors");
const getPages = require("../../db/models/page/getPages");
const messages = require("../../db/data/error.message.json");

module.exports = async (req, res, next) => {
  try {
    const pageId = req.params.pageId;
    if (pageId) {
      req.page = await getPages({ pageId });
      next();
    } else res.status(404).json(messages.pageNotFound).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to find page");
  }
};
