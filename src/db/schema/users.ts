import mongoose from "mongoose";
import { toLowerCase } from "@utils/app/generateStr";
import { v4 } from "uuid";
import type { IUserSchema } from "@app/user";

const Schema = mongoose.Schema;
const userSchema = new Schema<IUserSchema>(
  {
    userId: { type: String, require: true, unique: true, default: v4 },
    // stripe generated customer id
    customerId: { type: String, default: "" },
    username: { type: String, require: true, unique: true },
    email: { type: String, set: toLowerCase },
    name: { type: String, default: "" },
    nickname: { type: String, default: "" },
    accountTier: { type: Schema.Types.ObjectId, ref: "Subscription" },
    isPlatformOwner: { type: Boolean, default: false },
    role: { type: String, default: "customer" },
    phone: { type: String, default: "" },
    locale: { type: String, default: "" },
    theme: { type: String, default: "" },
    avatar: { type: String, default: "" },
    notificationSettings: {
      email: {
        muteAllAccount: { type: Boolean, default: false },
        muteAllCheckout: { type: Boolean, default: false },
        muteAllCalendar: { type: Boolean, default: false },
        muteAllSocial: { type: Boolean, default: false },
        orderConfirmations: { type: Boolean, default: true },
        paymentReceipts: { type: Boolean, default: true },
        eventReminders: { type: Boolean, default: true },
        calendarChanges: { type: Boolean, default: true },
        newFeatureActivity: { type: Boolean, default: true },
        appChanges: { type: Boolean, default: true },
        taskReminders: { type: Boolean, default: true },
        subscriptionRenewal: { type: Boolean, default: true },
        promotionalNotifications: { type: Boolean, default: true },
        newFeatures: { type: Boolean, default: true },
        loginAlerts: { type: Boolean, default: true },
        accountChanges: { type: Boolean, default: true },
        suspiciousActivity: { type: Boolean, default: true },
        messages: { type: Boolean, default: true },
        mentionsTags: { type: Boolean, default: true },
        activityAlerts: { type: Boolean, default: true },
        milestones: { type: Boolean, default: true },
      },
      notifications: {
        muteAllAccount: { type: Boolean, default: false },
        muteAllCheckout: { type: Boolean, default: false },
        muteAllCalendar: { type: Boolean, default: false },
        muteAllSocial: { type: Boolean, default: false },
        newFeatureActivity: { type: Boolean, default: true },
        appChanges: { type: Boolean, default: true },
        orderConfirmations: { type: Boolean, default: true },
        activityAlerts: { type: Boolean, default: true },
        paymentReceipts: { type: Boolean, default: true },
        eventReminders: { type: Boolean, default: true },
        taskReminders: { type: Boolean, default: true },
        calendarChanges: { type: Boolean, default: true },
        subscriptionRenewal: { type: Boolean, default: true },
        promotionalNotifications: { type: Boolean, default: true },
        newFeatures: { type: Boolean, default: true },
        loginAlerts: { type: Boolean, default: true },
        accountChanges: { type: Boolean, default: true },
        suspiciousActivity: { type: Boolean, default: true },
        messages: { type: Boolean, default: true },
        mentionsTags: { type: Boolean, default: true },
        milestones: { type: Boolean, default: true },
      },
      phone: {
        subscriptionRenewal: { type: Boolean, default: true },
        milestones: { type: Boolean, default: true },
        loginAlerts: { type: Boolean, default: true },
        accountChanges: { type: Boolean, default: true },
        suspiciousActivity: { type: Boolean, default: true },
      },
    },
    permissions: {
      type: [{ appId: { type: Schema.Types.ObjectId, ref: "App", require: true }, role: { type: String } }],
      default: [],
    },
    boards: {
      type: [
        {
          boardId: { type: Schema.Types.ObjectId, ref: "Tasks" },
          boardUid: { type: String },
          role: { type: String },
        },
      ],
      default: [],
    },
    auth: { type: Schema.Types.ObjectId, ref: "Auth" },
    ownedApps: { type: [{ type: Schema.Types.ObjectId, ref: "App" }], default: [] },
    accountTiers: { type: [{ type: Schema.Types.ObjectId, ref: "Subscription" }], default: [] },
    notifications: { type: [{ type: Schema.Types.ObjectId, ref: "Notification" }], default: [] },
    archivedNotifications: { type: [{ type: String, ref: "Notification" }], default: [] },
    subscriptions: { type: [{ type: String }], default: [] },
    feed: { type: [{ type: Schema.Types.ObjectId, ref: "Post" }], default: [] },
    orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
    messages: { type: [{ type: Schema.Types.ObjectId, ref: "Messages" }], default: [] },
    likePosts: { type: [{ type: String }], default: [] },
    likeMessages: { type: [{ type: String }], default: [] },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);

export default Users;
