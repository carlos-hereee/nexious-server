import router  from "express".Router();
// routes
import register  from "./register";
import userRoute  from "./userRoute";
import getWithUsername  from "./getWithUsername";
import refreshToken  from "./refreshToken";
import login  from "./login";
import logout  from "./logout";
import changePassword  from "./changePassword";
// custom middleware
import { validateUser, requireUser, authenticateUser }  from "../../middleware/auth";
import { addPassHistory }  from "../../middleware/auth";
import updatePassword  from "../../middleware/auth/updatePassword";
import sendToken  from "./login";
import authenticatePassword  from "../../middleware/auth/authenticatePassword";
import getAccessData  from "./getAccessData";
// one liners
const validateWare = [validateUser, requireUser, authenticatePassword];
const userWare = [validateUser, requireUser];
const changePasswordWare = [addPassHistory, updatePassword, changePassword];

// get
router.get("/", requireUser, userRoute);
// TODO: ADD ADDITIONAL VERFICATION METHODS
router.get("/user/:username", userWare, getWithUsername);
router.get("/access-token", requireUser, getAccessData);
// post
router.post("/register", validateUser, authenticateUser, register, sendToken);
router.post("/login", validateWare, login);
router.post("/refresh-token", requireUser, refreshToken);
router.post("/change-password", validateWare, changePasswordWare);
// TODO: ADD ADDITIONAL VERFICATION MEDTHODS
router.post("/forgot-password", userWare, changePasswordWare);
// log out
router.delete("/logout", requireUser, logout);

export  router;
