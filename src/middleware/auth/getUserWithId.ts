import getUser from "@dbModels/users/getUser";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const getUserWithId: RouterProps = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await getUser({ userId });
    res.status(200).json(user).end();
  } catch (error) {
    useGenericErrors(res, error, "error getting user with user ID");
  }
};
