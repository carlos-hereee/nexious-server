import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateNewsletter = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    req.project.newsletter.title = req.body.title;
    req.project.newsletter.details = req.body.details;
    req.project.newsletter.hero = req.asset || req.body.hero || "";
    req.project.newsletter.subtitle = req.body.subtitle;
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured upating newsletter");
  }
};
