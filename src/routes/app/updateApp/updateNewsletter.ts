import { AppRequest } from "@app/request";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateNewsletter = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    req.myApp.newsletter.title = req.body.title;
    req.myApp.newsletter.details = req.body.details;
    req.myApp.newsletter.hero = req.asset || req.body.hero || "";
    req.myApp.newsletter.subtitle = req.body.subtitle;
    await req.myApp.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured upating newsletter");
  }
};
