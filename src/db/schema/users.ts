const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/app/lowerCase");
const { v4 } = require("uuid");

const userSchema = new Schema(
  {
    userId: { type: String, require: true, unique: true, default: v4 },
    username: { type: String, require: true, unique: true },
    email: { type: String, set: toLower },
    nickname: { type: String },
    phone: { type: String },
    locale: { type: String },
    theme: { type: String },
    hero: { type: Schema.Types.ObjectId, ref: "Hero" },
    permissions: [
      { appId: { type: Schema.Types.ObjectId, ref: "App", require: true }, role: { type: String } },
    ],
    auth: {
      salt: { type: String, select: false },
      sessionId: { type: String, select: false },
      password: { type: String, select: false },
      passwordHistory: [{ type: String, select: false }],
    },
    ownedApps: [{ type: Schema.Types.ObjectId, ref: "App" }],
    subscriptions: [{ type: Schema.Types.ObjectId, ref: "App" }],
  },
  { timestamps: true }
);
export = mongoose.model("Users", userSchema);
