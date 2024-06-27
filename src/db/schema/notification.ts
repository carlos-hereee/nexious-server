import { INotificationSchema } from "@app/db";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const notificationSchema = new Schema<INotificationSchema>(
  {
    notificationId: { type: String, default: v4 },
    category: { type: String },
    message: { type: String },
    link: { type: String },
    name: { type: String },
  },
  { timestamps: true }
);
const Notfication = mongoose.model("Notification", notificationSchema);
export default Notfication;
