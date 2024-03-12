import { adminWare, heroWare } from "@middleware/app";
import { validateAdmin } from "@middleware/app/validateAdmin";
import { requireUser } from "@middleware/auth/requireUser";
import { getStoreWithAppId } from "./getStoreWithAppId";
import { requireStore } from "./requireStore";

export const merchWare = [requireUser, validateAdmin];
export const storeWare = [...adminWare, getStoreWithAppId, requireStore, ...heroWare];
export const storeRemovalWare = [...adminWare, getStoreWithAppId, requireStore];
