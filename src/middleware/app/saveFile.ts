import { awsImageUrl, isDev } from "@config";
import { addFile } from "@aws/index";
import { generateParamFile } from "@aws/awsParams";
import type { AssetProps } from "@app/assets";

export const saveFile: AssetProps = async (file, heroData, key) => {
  try {
    const params = generateParamFile(file);
    if (params) {
      await addFile(params);
      if (!heroData || !key) return awsImageUrl + params.Key;
      return { ...heroData, [key]: awsImageUrl + params.Key };
    }
    return null;
  } catch (error) {
    if (isDev) console.log("error :>> ", error);
  }
};
