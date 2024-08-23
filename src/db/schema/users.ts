import mongoose from "mongoose";
import { toLowerCase } from "@utils/app/lowerCase";
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
    permissions: {
      type: [{ appId: { type: Schema.Types.ObjectId, ref: "App", require: true }, role: { type: String } }],
      default: [],
    },
    auth: { type: Schema.Types.ObjectId, ref: "Auth" },
    ownedApps: { type: [{ type: Schema.Types.ObjectId, ref: "App" }], default: [] },
    accountTiers: { type: [{ type: Schema.Types.ObjectId, ref: "Subscription" }], default: [] },
    notifications: { type: [{ type: Schema.Types.ObjectId, ref: "Notification" }], default: [] },
    archivedNotifications: { type: [{ type: String, ref: "Notification" }], default: [] },
    subscriptions: { type: [{ type: Schema.Types.ObjectId, ref: "App" }], default: [] },
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
