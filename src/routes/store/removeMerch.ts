import removeMerch from "@dbModels/merch/removeMerch";
import { useGenericErrors } from "../../utils/auth/useGenericErrors";

export const removeMerchendise = async (req, res, next) => {
  try {
    const merchId = req.params.merchId;
    await removeMerch({ merchId });
    // TODO: REMOVE MERCH ON STRIPE
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove merch");
  }
};
