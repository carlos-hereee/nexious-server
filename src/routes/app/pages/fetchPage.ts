import { AppRequest } from "types/request";
import { getPage } from "@db/models/page/getPages";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const fetchPage = async (req: AppRequest, res: Response) => {
  try {
    const { pageId } = req.params;
    const page = await getPage({ pageId });
    res.status(200).json({ page }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting app name");
  }
};
