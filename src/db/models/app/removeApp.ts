import { AppFilters } from "types/app";
import App from "@db/schema/app";

export const removeApp = async ({ appId }: AppFilters) => {
  return await App.findOneAndDelete({ appId });
};
