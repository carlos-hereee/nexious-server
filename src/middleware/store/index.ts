import { adminWare } from "@middleware/app";
import { validateAdmin } from "@middleware/app/validateAdmin";
import { requireUser } from "@middleware/auth/requireUser";
import { getStoreWithAppId } from "./getStoreWithAppId";
import { requireStore } from "./requireStore";
import { uploadFields } from "@utils/aws/multer";
import { saveFieldAssets } from "@middleware/app/saveFieldAssets";

export const merchWare = [requireUser, validateAdmin];
export const storeWare = [...adminWare, getStoreWithAppId, requireStore];
export const storeRemovalWare = [...adminWare, getStoreWithAppId, requireStore];

export const merchindiseWare = [
  uploadFields([
    { name: "hero", maxCount: 1 },
    { name: "catalog", maxCount: 10 },
  ]),
  saveFieldAssets,
];
