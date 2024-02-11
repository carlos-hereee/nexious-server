import { AppFilters } from "@app/app";
import App from "@dbSchema/app";

export const removeApp = async ({ appId }: AppFilters) => {
  return await App.findOneAndDelete({ appId });
};
