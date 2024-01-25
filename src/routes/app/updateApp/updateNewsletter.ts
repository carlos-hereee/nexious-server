import type { RequestHandler } from "express";
import { formatFormData } from "@appUtils/format/formatFormData.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";

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
