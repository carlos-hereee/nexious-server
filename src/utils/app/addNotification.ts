import type { FormatNotification } from "@app/app";
import Notifications from "@db/schema/notification";
import { sendEmail } from "./sendEmail";
import { emailData, phoneData, appNotificationData } from "@db/data/data.json";
import { NSettings } from "@app/user";
import { generateMadLib } from "./generateStr";
import { sendSMS } from "./sendSMS";

interface NotificationData {
  category: string;
  subject: string;
  textData: string[];
  madLib: string[];
}
type Params = {
  [x in keyof NSettings]: NotificationData;
};

/**
 * 
 *   "add-merch": {
      "category": "store-merch",
      "textData": ["store-merch"],
      "name": "A new merchandise was added"
    },
    "cal-event": {
      "category": "cal-event",
      "textData": ["cal-event"],
      "name": "Calendar was updated"
    },
    "add-store": {
      "category": "store",
      "textData": ["store"],
      "name": "Successfully created store"
    },
    "edit-store": {
      "category": "store",
      "textData": ["store"],
      "name": "Successfully updated store"
    },
    "app-update": {
      "category": "app",
      "textData": ["app"],
      "name": "App udpate success"
    },
    "order-paid": {
      "category": "orders",
      "textData": ["orders"],
      "name": "Order paid"
    },
    "edit-calendar": {
      "category": "app",
      "textData": ["app"],
      "name": "Updated calendar"
    },
    "order-in-store": {
      "category": "orders",
      "textData": ["orders"],
      "name": "Order submitted"
    },
    "edit-merch": {
      "category": "orders",
      "textData": ["orders"],
      "name": "Merchandise update"
    }

 * @returns 
 */
// create notification
export const addNotification = async ({ type, message, link, name, user }: FormatNotification) => {
  // notification  not  for user
  if (!user) return await Notifications.create({ category: type || "user", message, link, name });
  const { notificationSettings, email, phone } = user;
  if (notificationSettings) {
    // send email
    if (notificationSettings.email[type]) {
      const { subject, textData, madLib } = (emailData as Params)[type];
      // generate email content
      const text = generateMadLib(textData, madLib, user);
      await sendEmail({ to: email, subject, text });
    }
    // send sms
    if (notificationSettings.phone[type]) {
      const { textData, madLib } = (phoneData as Params)[type];
      // generate email content
      const text = generateMadLib(textData, madLib, user);
      await sendSMS({ phone, textData: text });
    }
    // send app notification
    if ((appNotificationData as Params)[type]) {
      const { textData, subject, madLib } = (appNotificationData as Params)[type];
      const text = generateMadLib(textData, madLib, user);
      return await Notifications.create({ category: type || "user", message: text, link, name: subject });
    }
  }
  return null;
};
