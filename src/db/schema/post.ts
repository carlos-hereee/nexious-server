import { IPostSchema } from "@app/db";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const postSchema = new Schema<IPostSchema>(
  {
    postId: { type: String, default: v4 },
    uid: { type: String, default: v4 },
    appId: { type: String },
    thumbnail: { type: String },
    body: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
