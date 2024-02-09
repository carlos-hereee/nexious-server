import { awsImageUrl } from "@appUtils/config";
import { createPage } from "@dbModels/page/createPage";
import { formatFormData } from "@appUtils/format/formatFormData";
import { formatMenuPageData } from "@appUtils/format/formatMenuPageData";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { addFile } from "@aws/index";
import { generateParamFile } from "@aws/awsParams";
import type { ISection } from "@app/page";
import { NextFunction, Request, Response } from "express";

export const addPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.myApp) {
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
          let sections: ISection[] = [];
          for (let item = 0; item < refs.hasSections.length; item++) {
            const sectionHero = req.files.sectionHero[item];
            const current = refs.hasSections[item];
            if (sectionHero && current) {
              const params = generateParamFile(sectionHero);
              if (params) {
                await addFile(params);
                sections.push({ ...current, sectionHero: awsImageUrl + params.Key });
              }
            }
          }
          pageData.sections = sections;
        }
      }
      const page = await createPage(pageData);
      const menuData = formatMenuPageData(page.name);

      req.myApp.pages.push(page._id);
      req.myApp.menu.push(menuData);
      await req.myApp.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add page ");
  }
};
