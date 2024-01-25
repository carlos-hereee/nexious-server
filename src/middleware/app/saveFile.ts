import { awsImageUrl } from "@config";
// import { awsImageUrl, isDev } from "@config";
import { addFile } from "@aws/index.js";
import { generateParamFile } from "@aws/awsParams.js";
// import type { AssetProps, IFile } from "@app/assets.js";
import type { IFile } from "@app/assets.js";

// export const saveFile: AssetProps = (file, heroData, key): string => {
export const saveFile = (file: IFile): string => {
  // try {
  //   const params = generateParamFile(file);
  //   if (params) {
  //     await addFile(params);
  //     if (!heroData || !key) return awsImageUrl + params.Key;
  //     return { ...heroData, [key]: awsImageUrl + params.Key };
  //   }
  //   return null;
  // } catch (error) {
  //   if (isDev) console.log("error :>> ", error);
  // }
  const params = generateParamFile(file);
  if (params) {
    addFile(params);
    // if (!heroData || !key) return awsImageUrl + params.Key;
    return awsImageUrl + params.Key;
    // return { ...heroData, [key]: awsImageUrl + params.Key };
  }
  return "";
};
