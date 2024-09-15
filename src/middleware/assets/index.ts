import { requireUser } from "@middleware/auth/requireUser";
import { uploadSingle } from "@utils/aws/multer";
import { saveAsset } from "./saveAsset";

export const assetWare = [requireUser, uploadSingle("hero"), saveAsset];
