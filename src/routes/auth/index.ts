import router from "express";
// routes
import { register } from "./register.js";
import { userRoute } from "./userRoute.js";
import { getWithUsername } from "./getWithUsername.js";
import { refreshToken } from "./refreshToken.js";
import { logout } from "./logout.js";
import { changePassword } from "./changePassword.js";
import { sendToken } from "./sendToken.js";
import { getAccessData } from "./getAccessData.js";
// custom middleware
import {
  validateUser,
  requireUser,
  authenticateUser,
  addPassHistory,
  updatePassword,
  authenticatePassword,
} from "@authWare/index.js";

const route = router.Router();
// one liners
const validateWare = [validateUser, requireUser, authenticatePassword];
const userWare = [validateUser, requireUser];
const changePasswordWare = [addPassHistory, updatePassword, changePassword];

// get
route.get("/", requireUser, userRoute);
// TODO: ADD ADDITIONAL VERFICATION METHODS
route.get("/user/:username", userWare, getWithUsername);
route.get("/access-token", requireUser, getAccessData);
// post
route.post("/register", validateUser, authenticateUser, register, sendToken);
route.post("/login", validateWare, sendToken);
route.post("/refresh-token", requireUser, refreshToken);
route.post("/change-password", validateWare, changePasswordWare);
// TODO: ADD ADDITIONAL VERFICATION MEDTHODS
route.post("/forgot-password", userWare, changePasswordWare);
// log out
route.delete("/logout", requireUser, logout);

export default route;
