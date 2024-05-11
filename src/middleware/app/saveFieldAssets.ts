import { NextFunction, Response } from "express";
import { FileRequest } from "@app/request";
import { saveFile } from "@utils/aws";

export const saveFieldAssets = (req: FileRequest, _res: Response, next: NextFunction) => {
  // check if files exists
  // init assets properties
  req.assets = { hero: "", sectionHero: [], catalog: [] };
  if (req.files) {
    // save hero if exists
    if (req.files.hero && req.files.hero[0]) req.assets.hero = saveFile(req.files.hero[0]);
    // save sectionHero if exists
    if (req.files.sectionHero && req.files.sectionHero?.length > 0) {
      // while files are being added to bucket format urls
      req.assets.sectionHero = req.files.sectionHero.map((file) => saveFile(file));
    }
    if (req.files.catalog && req.files.catalog?.length > 0) {
      // while files are being added to bucket format urls
      req.assets.catalog = req.files.catalog.map((file) => saveFile(file));
    }
  }
  next();
};
