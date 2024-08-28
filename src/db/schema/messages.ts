import { IMessage } from "@app/db";
import mongoose from "mongoose";
import { v4 } from "uuid";
const Schema = mongoose.Schema;

const messageSchema = new Schema<IMessage>(
  {
    // universal id
    uid: { type: String, default: v4 },
    messageId: { type: String, default: v4 },
    data: { type: String, default: "" },
    title: { type: String, default: "" },
    status: {
      star: { type: Number },
      reaction: { type: String, default: "" },
      nestLevel: { type: Number, default: 0 },
      likeCount: { type: Number, default: 0 },
      messageStatus: { type: String, default: "sent" },
      messageLikes: { type: [{ type: String, default: "" }], default: [] },
    },
    user: {
      avatar: { type: String },
      role: { type: String, default: "user" },
      userId: { type: String },
      name: { type: String },
    },
    recipient: {
      avatar: { type: String },
      role: { type: String, default: "user" },
      userId: { type: String },
      name: { type: String },
    },
    replies: {
      type: [{ type: Schema.Types.ObjectId, ref: "Messages" }],
      default: [],
    },
  },
  { timestamps: true }
);
const Messages = mongoose.model("Messages", messageSchema);
export default Messages;
