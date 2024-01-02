import getApp  from "../../../db/models/app/getApp";
// import getStore  from "../../../db/models/store/getStore";
import useGenericErrors  from "../../../utils/auth/useGenericErrors";

module.exports = async (req, res) => {
  try {
    const appName = req.params.appName.split("+").join(" ");
    const app = await getApp({ appName });
    // const store = await getStore({ storeId: app.store?.storeId });
    // res.status(200).json({ app, store }).end();
    res.status(200).json({ app }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting app name");
  }
};
