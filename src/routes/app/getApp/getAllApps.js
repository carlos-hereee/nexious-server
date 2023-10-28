const getApp = require("../../../db/models/app/getApp");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    const apps = await getApp({ all: true });
    res.status(200).json(apps).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured gettign all apps");
  }
};
