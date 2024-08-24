import { INotificationSchema } from "@app/db";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const notificationSchema = new Schema<INotificationSchema>(
  {
    notificationId: { type: String, default: v4 },
    category: { type: String, default: "user" },
    message: { type: String, default: "" },
    link: { type: String, default: "" },
    name: { type: String, default: "" },
  },
  { timestamps: true }
);
const Notifications = mongoose.model("Notification", notificationSchema);
export default Notifications;
