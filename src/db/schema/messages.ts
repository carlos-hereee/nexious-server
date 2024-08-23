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
      reaction: { type: String, default: "" },
      likeCount: { type: Number, default: 0 },
      messageStatus: { type: String, default: "sent" },
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
      type: [
        {
          uid: { type: String, default: v4 },
          replyId: { type: String, default: v4 },
          user: { avatar: { type: String }, userId: { type: String }, name: { type: String } },
          data: { type: String, default: "" },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);
const Messages = mongoose.model("Messages", messageSchema);
export default Messages;
