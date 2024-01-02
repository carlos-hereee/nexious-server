import useGenericErrors from "../../../utils/auth/useGenericErrors";

export = async (req, res, next) => {
  try {
    req.user.subscriptions.push(req.app._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
