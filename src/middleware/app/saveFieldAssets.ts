import { awsImageUrl } from "@appUtils/config";
import { saveFile } from "middleware/app/saveFile";
import { addFile } from "@aws/index";
import { generateParamFiles } from "@aws/awsParams";
import { NextFunction, Response } from "express";
import { FileRequest } from "@app/request";

export const saveFieldAssets = (req: FileRequest, _res: Response, next: NextFunction) => {
  // check if files exists
  if (req.files) {
    // save landing hero if exists
    if (req.files.hero[0]) {
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
};
