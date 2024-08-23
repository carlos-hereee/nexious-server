import { IPostSchema } from "@app/db";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const postSchema = new Schema<IPostSchema>(
  {
    postId: { type: String, default: v4 },
    uid: { type: String, default: v4 },
    appId: { type: String },
    thumbnail: { type: String, default: "" },
    body: { type: String, default: "" },
    likeCount: { type: Number, default: 0 },
    likeUsers: { type: [{ type: String }], default: [] },
    comments: { type: [{ type: Schema.Types.ObjectId, ref: "Messages" }], default: [] },
    pinnedComment: { type: [{ type: Schema.Types.ObjectId, ref: "Messages" }], default: [] },
    link: { type: String, default: "" },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
