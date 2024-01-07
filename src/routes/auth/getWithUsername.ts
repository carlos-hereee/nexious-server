import getUserAuth from "@dbModels/users/getUserAuth";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const getWithUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await getUserAuth({ username });
    // // TODO: ADD ADDITIONAL VERFICATION METHODS
    res.status(200).json(user).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to get user with username");
  }
};