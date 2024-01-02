import getUserAuth  from "../../db/models/users/getUserAuth";
import useGenericErrors  from "../../utils/auth/useGenericErrors";

module.exports = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await getUserAuth({ username });
    // // TODO: ADD ADDITIONAL VERFICATION METHODS
    res.status(200).json(user).end();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
