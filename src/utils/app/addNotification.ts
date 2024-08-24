import type { FormatNotification } from "@app/app";
import Notifications from "@db/schema/notification";
import { sendEmail } from "./sendEmail";
import { emailData } from "@db/data/data.json";
import { NSettings } from "@app/user";
import { emailMadLib } from "./generateStr";

interface NotificationData {
  category: string;
  subject: string;
  textData: string[];
  madLib: string[];
}
type Params = {
  [x in keyof NSettings]: NotificationData;
};

// create notification
export const addNotification = async ({ type, message, link, name, user }: FormatNotification) => {
  // require key variable
  if (user && user.notificationSettings) {
    const { notificationSettings } = user;

    // send email
    if (notificationSettings.email[type]) {
      const { subject, textData, madLib } = (emailData as Params)[type];
      // generate email content
      const text = emailMadLib(textData, madLib, user);
      await sendEmail({ to: user.email, subject, text });
    }
  }
  return null;
  return await Notifications.create({ category: type || "user", message, link, name });
};
