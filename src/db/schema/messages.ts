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
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    recipient: { type: Schema.Types.ObjectId, ref: "Users" },
    recipientRole: { type: String, default: "customer" },
    replies: {
      type: [
        {
          uid: { type: String, default: v4 },
          user: { type: Schema.Types.ObjectId, ref: "Users" },
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
