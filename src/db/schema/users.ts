import mongoose from "mongoose";
import { toLowerCase } from "@utils/app/lowerCase";
import { v4 } from "uuid";
import type { IUserSchema } from "@app/user";

const Schema = mongoose.Schema;
const userSchema = new Schema<IUserSchema>(
  {
    userId: { type: String, require: true, unique: true, default: v4 },
    username: { type: String, require: true, unique: true },
    email: { type: String, set: toLowerCase },
    name: { type: String },
    nickname: { type: String },
    phone: { type: String },
    locale: { type: String },
    theme: { type: String },
    avatar: { type: String },
    permissions: {
      type: [{ appId: { type: Schema.Types.ObjectId, ref: "App", require: true }, role: { type: String } }],
      default: [],
    },
    auth: { type: Schema.Types.ObjectId, ref: "Auth" },
    ownedApps: { type: [{ type: Schema.Types.ObjectId, ref: "App" }], default: [] },
    notifications: { type: [{ type: Schema.Types.ObjectId, ref: "Notification" }], default: [] },
    archivedNotifications: { type: [{ type: String, ref: "Notification" }], default: [] },
    subscriptions: { type: [{ type: Schema.Types.ObjectId, ref: "App" }], default: [] },
    feed: { type: [{ type: Schema.Types.ObjectId, ref: "Post" }], default: [] },
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);

export default Users;
