import Messages from "@db/schema/messages";
import Post from "@db/schema/post";
// import { IPostSchema } from "@app/db";
import { postsPopulate } from "@db/data/app/dbPopulateData.json";

interface PotsFilters {
  appId?: string;
  postId?: string;
  uid?: string;
  id?: string;
  all?: boolean;
  messageId?: string;
}
export const getPosts = async ({ appId }: PotsFilters) => {
  if (appId) return await Post.find({ appId });
  return await Post.find().populate({ path: "comments", populate: postsPopulate, options: { strictPopulate: false } });
};
export const getPost = async ({ postId }: PotsFilters) => {
  if (postId) return await Post.findOne({ postId });
  return null;
};

export const getMessage = async ({ messageId, uid, id }: PotsFilters) => {
  if (messageId) return await Messages.findOne({ messageId });
  if (uid) return await Messages.findOne({ uid });
  if (id) return await Messages.findOne({ _id: id });
  return null;
};
