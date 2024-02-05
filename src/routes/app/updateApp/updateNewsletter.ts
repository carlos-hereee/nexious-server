import type { RequestHandler } from "express";
import { formatFormData } from "@appUtils/format/formatFormData";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateNewsletter: RequestHandler = async (req, res, next) => {
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
