import router from "express";
// routes
import { register } from "./register";
import userRoute from "./userRoute";
import getWithUsername from "./getWithUsername";
import refreshToken from "./refreshToken";
import login from "./login";
import logout from "./logout";
import changePassword from "./changePassword";
// custom middleware
import { validateUser, requireUser, authenticateUser } from "../../middleware/auth";
import { addPassHistory } from "../../middleware/auth";
import { updatePassword } from "@authWare/updatePassword";
import sendToken from "./login";
import { authenticatePassword } from "@authWare/authenticatePassword";
import getAccessData from "./getAccessData";

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
route.post("/login", validateWare, login);
route.post("/refresh-token", requireUser, refreshToken);
route.post("/change-password", validateWare, changePasswordWare);
// TODO: ADD ADDITIONAL VERFICATION MEDTHODS
route.post("/forgot-password", userWare, changePasswordWare);
// log out
route.delete("/logout", requireUser, logout);

export = route;
