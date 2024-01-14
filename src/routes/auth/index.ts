import router from "express";
// routes
import { register } from "./register";
import { userRoute } from "./userRoute";
import { getWithUsername } from "./getWithUsername";
import { refreshToken } from "./refreshToken";
import { logout } from "./logout";
import { changePassword } from "./changePassword";
import { sendToken } from "./sendToken";
import { getAccessData } from "./getAccessData";
// custom middleware
import {
  validateUser,
  requireUser,
  authenticateUser,
  addPassHistory,
  updatePassword,
  authenticatePassword,
} from "@authWare/index";

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
