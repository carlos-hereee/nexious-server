import { IUserSchema } from "@app/user";
import { today12hr } from "./format/generateDate";
import { clientUrl } from "./config";

export const toLowerCase = (str: string) => str.toLowerCase();
export const userName = (user: IUserSchema) => user.name || user.nickname || user.username || user.email || "";
export const generatePasswordResetUrl = (id: string) => clientUrl + "/reset-password/?userid=" + id;
// TODO:  "Location of Change: {{City, Country (if applicable)}}",
// TODO:   "- Review your account activity: {{Account Activity Link}}",,
export const emailMadLib = (textData: string[], madLib: string[], user: IUserSchema) => {
  return textData
    .map((str) => {
      const targetIdx = madLib.findIndex((val) => str.includes(val));
      if (targetIdx >= 0) {
        const command = madLib[targetIdx];
        if (command === "{{name}}") return str.replace(command, userName(user));
        if (command === "{{date-and-time}}") return str.replace(command, today12hr());
        if (command === "{{resetPasswordLink}}") return str.replace(command, generatePasswordResetUrl(user.userId));
        if (command === "{{support-email}}") return str.replace(command, "carlos.h@nexious.tech");
      }
      return str;
    })
    .join("");
};
