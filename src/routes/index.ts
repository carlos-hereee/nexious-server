import authRoute from "./auth/index";
import appRoute from "./app/index";
// import calendarRoute from "./calendar";
import storeRoute from "./store/index";
import { initRoute, startApp } from "./initRoute";
import { ExpressApp } from "@app/db";
import { deserializeUser } from "@middleware/auth/deserializeUser";
import { RequestHandler } from "express";

export default (app: ExpressApp) => {
  startApp(app);
  // app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  //   res.status ? res.status : res.status(500);
  //   res.json(error);
  // });
  // middleware for all functions
  // TODO: DEBUG ERROR
  // app.use(deserializeUser);
  app.use(deserializeUser as unknown as RequestHandler);
  // initial test route
  app.get("/", initRoute);
  // authentication route for login and access/refresh tokens
  app.use("/auth/", authRoute);
  // app data
  app.use("/app/", appRoute);
  // app.use("/calendar/", calendarRoute);
  app.use("/store/", storeRoute);
};
// // assets route
// import publicRoute  from "./public";
// import heroRoute  from "./hero";
// app.use("/public", publicRoute);
// app.use("/hero/", heroRoute);
