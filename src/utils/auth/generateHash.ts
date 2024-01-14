import crypto from "crypto";
import { appSecret } from "@config";

export const generateHash = (salt: string, secret?: string) => {
  const payload = [salt, secret].join("/");
  return crypto.createHmac("sha256", payload).update(appSecret).digest("hex");
};
