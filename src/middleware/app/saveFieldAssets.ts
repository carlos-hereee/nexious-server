import { NextFunction, Response } from "express";
import { FileRequest } from "@app/request";
import { saveFile } from "@utils/aws";

export const saveFieldAssets = (req: FileRequest, _res: Response, next: NextFunction) => {
  // check if files exists
  if (req.files) {
    // save landing hero if exists
    if (req.files.hero[0]) {
      req.assets.hero = saveFile(req.files.hero[0]);
    }
    // save sectionHero if exists
    if (req.files.sectionHero?.length > 0) {
      // while files are being added to bucket format urls
      req.assets.sectionHero = req.files.sectionHero.map((file) => saveFile(file));
    }
  }
  next();
};
