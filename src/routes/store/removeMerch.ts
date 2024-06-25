import { StoreRequest } from "types/request";
import { StoreBody } from "types/store";
import { removeMerch } from "@db/models/merch/removeMerch";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const removeMerchendise = async (req: StoreRequest<StoreBody>, res: Response) => {
  try {
    const merchId = req.params.merchId;
    await removeMerch({ merchId });
    // TODO: REMOVE MERCH ON STRIPE
    res.status(204);
  } catch (error) {
    useGenericErrors(res, error, "unable to remove merch");
  }
};
