import { awsImageUrl } from "@utils/app/config";
// import { awsImageUrl, isDev } from "@config";
import { addFile } from "@utils/aws/index";
import { generateParamFile } from "@utils/aws/awsParams";
// import type { AssetProps, IFile } from "@app/assets";
import type { IFile } from "@app/assets";

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
