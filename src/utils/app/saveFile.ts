import { awsImageUrl, isDev } from "@config";
import { addFile } from "../aws";
import { generateParamFile } from "../aws/awsParams";

export = async (file, heroData, key) => {
  try {
    const params = generateParamFile(file);
    await addFile(params);
    if (!heroData) return awsImageUrl + params.Key;
    return { ...heroData, [key]: awsImageUrl + params.Key };
  } catch (error) {
    if (isDev) console.log("error :>> ", error);
  }
};
