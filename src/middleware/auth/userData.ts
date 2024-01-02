import getUser from "@dbModels/users/getUser";
import useGenericErrors from "../../utils/auth/useGenericErrors";

export = (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await getUser({ userId });
    res.status(200).json({ user }).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to send user data");
  }
};
