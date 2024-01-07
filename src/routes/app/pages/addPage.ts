import { awsImageUrl } from "@config";
import createPage from "@dbModels/page/createPage";
import { formatFormData } from "@appUtils/format/formatFormData";
import formatMenuPageData from "@appUtils/format/formatMenuPageData";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { addFile } from "@aws/index";
import { generateParamFile } from "@aws/awsParams";
import type { MiddlewareProps } from "@app/app";

export const addPage: MiddlewareProps = async (req, res, next) => {
  try {
    let { pageData, refs } = formatFormData(req.body);
    if (req.files) {
      if (req.files.hero) {
        const pageHero = req.files.hero[0];
        const params = generateParamFile(pageHero);
        if (params) {
          await addFile(params);
          pageData.hero = awsImageUrl + params.Key;
        }
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
