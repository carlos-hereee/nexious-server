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
    nickname: { type: String },
    phone: { type: Number },
    locale: { type: String },
    theme: { type: String },
    avatar: { type: String },
    permissions: [{ appId: { type: Schema.Types.ObjectId, ref: "App", require: true }, role: { type: String } }],
    auth: { type: Schema.Types.ObjectId, ref: "Auth" },
    ownedApps: [{ type: Schema.Types.ObjectId, ref: "App" }],
    subscriptions: [{ type: Schema.Types.ObjectId, ref: "App" }],
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);

export default Users;
