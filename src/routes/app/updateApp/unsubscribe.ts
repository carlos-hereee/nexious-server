import { useGenericErrors } from "../../../utils/auth/useGenericErrors";

export const unsubscribe = async (req, res, next) => {
  try {
    req.user.subscriptions = req.user.subscriptions.filter((sub) => sub !== req.app._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
