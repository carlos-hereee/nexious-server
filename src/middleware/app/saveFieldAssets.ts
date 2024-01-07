import { awsImageUrl } from "@config";
import { saveFile } from "middleware/app/saveFile";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { addFile } from "@aws/index";
import { generateParamFiles } from "@aws/awsParams";
import type { MiddlewareProps } from "@app/db";

export const saveFieldAssets: MiddlewareProps = async (req, res, next) => {
  try {
    req.assets = { hero: "", sectionHero: [] };
    // check if files exists
    if (req.files) {
      // save landing hero if exists
      if (req.files.hero?.length > 0) {
        const url = saveFile(req.files.hero[0]);
        req.asset.hero = url;
      }
      // save sectionHero if exists
      if (req.files.sectionHero?.length > 0) {
        // generate params first
        const params = generateParamFiles(req.files.sectionHero);
        // save file
        params.forEach(async (param) => await addFile(param));
        // while files are being added to bucket format urls
        req.asset.sectionHero = params.map((p) => awsImageUrl + p.Key);
      }
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save field assets");
  }
};
