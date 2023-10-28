const saveUser = require("../../db/models/users/saveUser");
const random = require("../../utils/auth/random");
const generateHash = require("../../utils/auth/generateHash");
const { v4 } = require("uuid");
const useGenericErrors = require("../../utils/auth/useGenericErrors");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const username = req.body.username;
    const email = req.body.email || "";
    const phone = req.body.phone || "";
    const userId = v4();
    const salt = random();
    // save protect password with hash-encryption
    const password = generateHash(salt, req.body.password);
    const sessionId = generateHash(salt, userId);
    const auth = { salt, password, sessionId, passwordHistory: [password] };
    req.user = auth;
    await saveUser({ userId, email, username, auth, phone });
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
