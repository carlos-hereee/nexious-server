import { requireApp } from "./requireApp";
import { validateAdmin } from "./validateAdmin";
import { getAppWithAppId } from "./getAppWithAppId";
import { requireUser } from "@middleware/auth/requireUser";
import { uploadFields, uploadSingle } from "@utils/aws/multer";
import { saveAsset } from "./saveAsset";
import { requireAppName } from "./requireAppName";
import { requireUniqueName } from "./requireUniqueName";
import { saveFieldAssets } from "./saveFieldAssets";

export const adminWare = [requireUser, validateAdmin, getAppWithAppId, requireApp];
export const heroWare = [...adminWare, uploadSingle("hero"), saveAsset];
export const logoWare = [requireUser, validateAdmin, getAppWithAppId, uploadSingle("logo"), saveAsset];
export const initAppWare = [requireUser, uploadSingle("logo"), requireAppName, requireUniqueName];
export const userAppWare = [requireUser, getAppWithAppId, requireApp];
export const multiHeroWare = [
  ...adminWare,
  uploadFields([
    { name: "hero", maxCount: 1 },
    { name: "sectionHero", maxCount: 10 },
  ]),
  saveFieldAssets,
];
