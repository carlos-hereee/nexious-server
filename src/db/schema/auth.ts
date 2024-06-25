import mongoose from "mongoose";
import type { IAuthSchema } from "types/auth";

const Schema = mongoose.Schema;
const authSchema = new Schema<IAuthSchema>(
  {
    salt: { type: String, select: false },
    sessionId: { type: String, select: false },
    password: { type: String, select: false },
    passwordHistory: [{ type: String, select: false }],
  },
  { timestamps: true }
);
const Auth = mongoose.model("Auth", authSchema);

export default Auth;
