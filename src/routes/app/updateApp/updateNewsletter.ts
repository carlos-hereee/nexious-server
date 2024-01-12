import type { MiddlewareProps } from "@app/express";
import { formatFormData } from "@appUtils/format/formatFormData";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateNewsletter: MiddlewareProps = async (req, res, next) => {
  try {
    let { pageData } = formatFormData(req.body);
    req.myApp.newsletter = { ...pageData, hero: req.asset || "" };
    await req.myApp.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured upating newsletter");
  }
};
