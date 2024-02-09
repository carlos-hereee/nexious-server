import message from "@data/error.message.json";

export const requireAppName = (req: Request, res: Response, next: NextFunction) => {
  const appName = req.body.appName || req.params.appName;
  // appName must exists
  if (!appName) return res.status(400).json(message.missingCredentials).end();
  next();
};
