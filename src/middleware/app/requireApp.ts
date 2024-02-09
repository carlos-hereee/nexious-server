import message from "@data/error.message.json";

export const requireApp = (req: Request, res: Response, next: NextFunction) => {
  req.myApp ? next() : res.status(404).json(message.appNotFound);
};
