import { formatFormData } from "@appUtils/format/formatFormData";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Request, Response } from "express";

export const updateNewsletter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.myApp) {
      let { pageData } = formatFormData(req.body);
      req.myApp.newsletter = { ...pageData, hero: req.asset || "" };
      await req.myApp.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured upating newsletter");
  }
};
