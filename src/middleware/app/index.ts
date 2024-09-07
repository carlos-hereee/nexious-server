import { requireApp } from "./requireApp";
import { validateAdmin } from "./validateAdmin";
import { getAppWithAppId } from "./getAppWithAppId";
import { requireUser } from "@middleware/auth/requireUser";
import { uploadFields, uploadSingle } from "@utils/aws/multer";
import { saveAsset } from "./saveAsset";
import { requireAppName } from "./requireAppName";
import { requireUniqueName } from "./requireUniqueName";
import { saveFieldAssets } from "./saveFieldAssets";
import { aquireAppLanding } from "./aquireAppLanding";
import { requirePage } from "./requirePage";
import { aquireAppPage } from "./aquireAppPage";
import { requirePost } from "./requirePost";
import { requireMessage } from "./requireMessage";

export const adminWare = [requireUser, getAppWithAppId, requireApp, validateAdmin];
export const appAdminWare = [requireApp, validateAdmin];
export const appWare = [requireUser, getAppWithAppId];
export const heroWare = [...adminWare, uploadSingle("hero"), saveAsset];
export const assetWare = [requireUser, uploadSingle("hero"), saveAsset];
export const logoWare = [...adminWare, getAppWithAppId, uploadSingle("logo"), saveAsset];
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
export const pageWare = [aquireAppPage, requirePage];
export const landingPageWare = [aquireAppLanding, requirePage];
export const postWare = [requireUser, requirePost];
export const messageWare = [requireUser, requireMessage];
