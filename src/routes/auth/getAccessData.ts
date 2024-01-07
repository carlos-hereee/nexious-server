import getApp from "@dbModels/app/getApp";
import getUser from "@dbModels/users/getUser";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export = (req, res) => {
  try {
    let data = {
      appList: await getApp({ all: true }),
      user: await getUser({ userId: req.user.userId }),
      // app: req.app.appId ? await getApp({ appId: req.app.appId }) : undefined,
    };
    // const app = await getApp({ appId: req.app.appId });
    // console.log("data :>> ", data);
    res.status(200).json(data).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
