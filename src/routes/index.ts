import authRoute from "./auth/index";
import appRoute from "./app/index";
import storeRoute from "./store/index";
import postRoute from "./post/index";
import calendarRoute from "./calendar/index";
import stripeRoute from "./stripe/index";
import { initRoute, startApp } from "./initRoute";
import type { ExpressApp } from "@app/db";
import { deserializeUser } from "@middleware/auth/deserializeUser";
import { RequestHandler } from "express";

export default (app: ExpressApp) => {
  startApp(app);
  app.use(deserializeUser as unknown as RequestHandler);
  // initial test route
  app.get("/", initRoute);
  // authentication route for login and access/refresh tokens
  app.use("/auth/", authRoute);
  // app data
  app.use("/app/", appRoute);
  app.use("/calendar/", calendarRoute);
  app.use("/store/", storeRoute);
  app.use("/stripe/", stripeRoute);
  app.use("/post/", postRoute);
};
