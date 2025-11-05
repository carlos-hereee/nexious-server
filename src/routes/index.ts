/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck - may need to be at the start of file
import authRoute from "./auth/index";
import appRoute from "./app/index";
import storeRoute from "./store/index";
import postRoute from "./post/index";
import calendarRoute from "./calendar/index";
import userRoute from "./user/index";
import stripeRoute from "./stripe/index";
import taskBoardRoute from "./tasks/index";
import { initRoute, startApp } from "./initRoute";
import type { ExpressApp } from "@app/db";
import { deserializeUser } from "@middleware/auth/deserializeUser";
import { requireUser } from "@middleware/auth/requireUser";

export default (app: ExpressApp) => {
  startApp(app);
  app.use(deserializeUser);
  // initial test route
  app.get("/", initRoute);
  // authentication route for login and access/refresh tokens
  app.use("/auth/", authRoute);
  app.use("/user/", requireUser, userRoute);
  // app data
  app.use("/app/", appRoute);
  app.use("/calendar/", calendarRoute);
  app.use("/store/", storeRoute);
  app.use("/task-board/", taskBoardRoute);
  app.use("/stripe/", stripeRoute);
  app.use("/post/", postRoute);
};
