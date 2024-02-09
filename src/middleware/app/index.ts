import { requireApp } from "./requireApp";
import { validateAdmin } from "./validateAdmin";
import { getAppWithAppId } from "./getAppWithAppId";
import { requireUser } from "@middleware/auth/requireUser";
import { uploadSingle } from "@aws/multer";
import { saveAsset } from "./saveAsset";

export const adminWare = [requireUser, validateAdmin, getAppWithAppId, requireApp];
export const heroWare = [...adminWare, uploadSingle("hero"), saveAsset];
