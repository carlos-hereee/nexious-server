// import { getMerch } from "@db/models/merch/getMerch";
import { getStore } from "@db/models/store/getStore";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Request, Response } from "express";

export const getStoreMerch = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    // const merch = await getMerch({ storeId });
    const store = await getStore({ storeId });
    // console.log("merch :>> ", merch);
    res.status(200).json(store?.inventory).end();
    // next();
  } catch (error) {
    useGenericErrors(res, error, "unable to get store inventory");
  }
};
