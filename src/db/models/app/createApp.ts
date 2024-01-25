import type { AppPayload } from "@app/app.js";
import App from "@dbSchema/app.js";

export const createApp = async (payload: AppPayload) => {
  return await App.create(payload);
};
