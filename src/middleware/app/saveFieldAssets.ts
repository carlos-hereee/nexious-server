import { awsImageUrl } from "@config";
import { saveFile } from "middleware/app/saveFile.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import { addFile } from "@aws/index.js";
import { generateParamFiles } from "@aws/awsParams.js";
import type { RequestHandler } from "express";

export const saveFieldAssets: RequestHandler = async (req, res, next) => {
  try {
    // check if files exists
    if (req.files) {
      req.assets = { hero: "", sectionHero: [] };
      // save landing hero if exists
      if (req.files.hero) {
        const url = saveFile(req.files.hero[0]);
        req.assets.hero = url;
      }
      // save sectionHero if exists
      if (req.files.sectionHero?.length > 0) {
        // generate params first
        const params = generateParamFiles(req.files.sectionHero);
        // save file
        params.forEach((param) => addFile(param));
        // while files are being added to bucket format urls
        req.assets.sectionHero = params.map((p) => awsImageUrl + p.Key);
      }
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save field assets");
  }
};
