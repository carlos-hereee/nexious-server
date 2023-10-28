const router = require("express").Router();
// routes
const register = require("./register");
const userRoute = require("./userRoute");
const getWithUsername = require("./getWithUsername");
const refreshToken = require("./refreshToken");
const login = require("./sendToken");
const logout = require("./logout");
const changePassword = require("./changePassword");
// custom middleware
const { validateUser, requireUser, authenticateUser } = require("../../middleware/auth");
const { validatePassword, addPassHistory } = require("../../middleware/auth");
const updatePassword = require("../../middleware/auth/updatePassword");
const sendToken = require("./sendToken");
// one liners
const validateWare = [validateUser, requireUser, validatePassword];
const userWare = [validateUser, requireUser];
const changePasswordWare = [addPassHistory, updatePassword, changePassword];

// get
router.get("/", requireUser, userRoute);
// TODO: ADD ADDITIONAL VERFICATION METHODS
router.get("/user/:username", userWare, getWithUsername);
// post
router.post("/register", validateUser, authenticateUser, register, sendToken);
router.post("/login", validateWare, login);
router.post("/refresh-token", requireUser, refreshToken);
router.post("/change-password", validateWare, changePasswordWare);
// TODO: ADD ADDITIONAL VERFICATION MEDTHODS
router.post("/forgot-password", userWare, changePasswordWare);
// log out
router.delete("/logout", requireUser, logout);

module.exports = router;
