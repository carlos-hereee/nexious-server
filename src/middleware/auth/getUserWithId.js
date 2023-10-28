const getUser = require("../../db/models/users/getUser");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await getUser({ userId });
    res.status(200).json(user).end();
  } catch (error) {
    useGenericErrors(res, error, "error getting user with user ID");
  }
};
