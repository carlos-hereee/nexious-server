import messages from "@data/error.message.json";

export const validateAdmin = (req, res, next) => {
  // const appId = req.params.appId || req.body.appId;
  const appId = req.params.appId;
  const isMatch = req.user.ownedApps.filter((data) => data.appId === appId);
  isMatch ? next() : res.status(400).json(messages.unauthorizedUser);
};
