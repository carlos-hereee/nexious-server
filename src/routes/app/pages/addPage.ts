import { awsImageUrl } from "../../../config";
import createPage from "../../../db/models/page/createPage";
import formatFormData from "../../../utils/app/format/formatFormData";
import formatMenuPageData from "../../../utils/app/format/formatMenuPageData";
import { useGenericErrors } from "../../../utils/auth/useGenericErrors";
import { addFile } from "../../../utils/aws";
import { generateParamFile } from "../../../utils/aws/awsParams";

export const addPage = async (req, res, next) => {
  try {
    let { pageData, refs } = formatFormData(req.body);
    if (req.files) {
      if (req.files.hero) {
        const pageHero = req.files.hero[0];
        const params = generateParamFile(pageHero);
        await addFile(params);
        pageData.hero = awsImageUrl + params.Key;
      }
      if (refs.hasSections) {
        let sections = [];
        for (let item = 0; item < refs.hasSections.length; item++) {
          const sectionHero = req.files.sectionHero[item];
          const current = refs.hasSections[item];
          const params = generateParamFile(sectionHero);
          if (params) {
            await addFile(params);
            sections.push({ ...current, sectionHero: awsImageUrl + params.Key });
          }
        }
        pageData.sections = sections;
      }
    }
    const page = await createPage(pageData);
    const menuData = formatMenuPageData(page.name);

    req.app.pages.push(page._id);
    req.app.menu.push(menuData);
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add page ");
  }
};
