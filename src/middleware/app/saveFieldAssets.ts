import { awsImageUrl } from "@config";
import saveFile from "../../utils/app/saveFile";
import useGenericErrors from "../../utils/auth/useGenericErrors";
import { addFile } from "../../utils/aws";
import { generateParamFiles } from "../../utils/aws/awsParams";

export = (req, res, next) => {
  try {
    req.asset = { hero: "", sectionHero: [] };
    // check if files exists
    if (req.files) {
      // save landing hero if exists
      if (req.files.hero?.length > 0) {
        const url = await saveFile(req.files.hero[0]);
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
