import getUserAuth from "@dbModels/users/getUserAuth";
import { useGenericErrors } from "../../utils/auth/useGenericErrors";

export = (req, res) => {
  try {
    const { username } = req.params;
    const user = await getUserAuth({ username });
    // // TODO: ADD ADDITIONAL VERFICATION METHODS
    res.status(200).json(user).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
