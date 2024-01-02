const getApp = require("../../../db/models/app/getApp");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    // send owned apps
    const apps = await getApp({ ownerId: req.user._id });
    res.status(202).json(apps).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
