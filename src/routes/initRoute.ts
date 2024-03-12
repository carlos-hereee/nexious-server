import type { Request, Response } from "express";
import { isDev, port } from "@utils/app/config";
import { ExpressApp } from "@app/db";

// test route
export const initRoute = (_req: Request, res: Response) => {
  const data = { message: `api is running on ${port}`, status: "success" };
  return res.status(200).json(data).end();
};
// init app
export const startApp = (app: ExpressApp) => {
  return app.listen(port, () => {
    if (isDev) console.log(`\n\n*** Server listening on port: ${port} ***\n\n`);
  });
};
