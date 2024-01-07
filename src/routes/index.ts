import { port } from "../config";
import authRoute from "./auth";
import appRoute from "./app";
import calendarRoute from "./calendar";
import storeRoute from "./store";
import type { ExpressApp } from "app-types";

// // assets route
// import publicRoute  from "./public";
// import heroRoute  from "./hero";
// app.use("/public", publicRoute);
// app.use("/hero/", heroRoute);

export = (app: ExpressApp) => {
  // initial test route
  app.get("/", (req, res) => {
    const message = `api is running on ${port}`;
    res.status(200).json(message).end();
  });
  // authentication route for login and access/refresh tokens
  app.use("/auth/", authRoute);
  // app data
  app.use("/app/", appRoute);
  app.use("/calendar/", calendarRoute);
  app.use("/store/", storeRoute);
};
