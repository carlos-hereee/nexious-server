import { IPostSchema } from "types/db";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const postSchema = new Schema<IPostSchema>(
  {
    postId: { type: String, default: v4 },
    message: { type: String },
    link: { type: String },
    name: { type: String },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
