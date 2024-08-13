import { IMessage } from "@app/db";
import mongoose from "mongoose";
import { v4 } from "uuid";
const Schema = mongoose.Schema;

const messageSchema = new Schema<IMessage>(
  {
    // universal id
    uid: { type: String, default: v4 },
    data: { type: String },
    title: { type: String },
    status: { type: String },
    user: { avatar: { type: String }, userId: { type: String }, name: { type: String } },
    recipient: { avatar: { type: String }, userId: { type: String }, name: { type: String } },
    recipientRole: { type: String, default: "customer" },
    replies: {
      type: [
        {
          uid: { type: String, default: v4 },
          user: { avatar: { type: String }, userId: { type: String }, name: { type: String } },
          data: { type: String },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);
const Messages = mongoose.model("Messages", messageSchema);
export default Messages;
