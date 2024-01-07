import formatFormData from "@appUtils/format/formatFormData";

export const updateNewsletter: MiddlewareProps = async (req, res, next) => {
  try {
    let { pageData } = formatFormData(req.body);
    req.app.newsletter = { ...pageData, hero: req.asset };
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "errror occured upating newsletter");
  }
};
