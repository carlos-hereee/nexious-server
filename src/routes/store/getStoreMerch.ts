import { getMerch } from "@dbModels/merch/getMerch.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import type { RequestHandler } from "express";

export const getStoreMerch: RequestHandler = async (req, res) => {
  try {
    const { storeId } = req.params;
    const merch = await getMerch({ storeId });
    // console.log("merch :>> ", merch);
    res.status(200).json(merch).end();
    // next();
  } catch (error) {
    useGenericErrors(res, error, "unable to get store inventory");
  }
};
