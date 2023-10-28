const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/app/lowerCase");

const userSchema = new Schema(
  {
    userId: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    email: { type: String, set: toLower },
    nickname: { type: String },
    phone: { type: String },
    languageId: { type: String },
    heroId: { type: Schema.Types.ObjectId, ref: "Hero" },
    permissions: [
      { appId: { type: Schema.Types.ObjectId, ref: "App" }, role: { type: String } },
    ],
    auth: {
      salt: { type: String, select: false },
      sessionId: { type: String, select: false },
      password: { type: String, select: false },
      passwordHistory: [{ type: String, select: false }],
    },
    ownedApps: [{ type: Schema.Types.ObjectId, ref: "App" }],
  },
  { timestamps: true }
);
const Users = mongoose.model("Users", userSchema);
module.exports = { Users, userSchema };
