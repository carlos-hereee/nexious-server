import type { FormatNotification } from "@app/app";
import Notifications from "@db/schema/notification";
import { sendEmail } from "./sendEmail";
// import { emailData, phoneData, appNotificationData } from "@db/data/data.json";
import { emailData, appNotificationData } from "@db/data/data.json";
import { NSettings } from "@app/user";
import { generateMadLib } from "./generateStr";
// import { sendSMS } from "./sendSMS";

interface NotificationData {
  subject: string;
  textData: string[];
  madLib: string[];
}
type Params = {
  [x in keyof NSettings]: NotificationData;
};

// create notification TODO: GENERATE APP NOTIFICATIONS  && CHECKOUT NOTIFICATIONS
export const addNotification = async ({ type, message, link, name, user }: FormatNotification) => {
  // notification  not  for user
  if (!user) return await Notifications.create({ category: type || "user", message, link, name });
  // const { notificationSettings, email, phone } = user;
  const { notificationSettings, email } = user;
  if (notificationSettings) {
    // send email
    if (notificationSettings.email[type]) {
      const { subject, textData, madLib } = (emailData as Params)[type];
      // generate email content
      const text = generateMadLib(textData, madLib, user);
      await sendEmail({ to: email, subject, text });
    }
    // // send sms
    // TODO: RESEARCH PRICING
    // if (notificationSettings.phone[type]) {
    //   const { textData, madLib } = (phoneData as Params)[type];
    //   // generate email content
    //   const text = generateMadLib(textData, madLib, user);
    //   await sendSMS({ phone, textData: text });
    // }
    // send app notification
    if ((appNotificationData as Params)[type]) {
      const { textData, subject, madLib } = (appNotificationData as Params)[type];
      const text = generateMadLib(textData, madLib, user);
      return await Notifications.create({ category: type || "user", message: text, link, name: subject });
    }
  }
  return null;
};
