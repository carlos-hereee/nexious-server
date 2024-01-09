import type { MiddlewareProps } from "@app/db";
import { formatFormData } from "@appUtils/format/formatFormData";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateNewsletter: MiddlewareProps = async (req, res, next) => {
  try {
    let { pageData } = formatFormData(req.body);
    req.apps.newsletter = { ...pageData, hero: req.asset || "" };
    await req.apps.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured upating newsletter");
  }
};
