import message from "@data/error.message.json";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  // check if user was found
  if (req.user) next();
  else {
    res.status(404).json(message.userNotFound).end();
  }
};
