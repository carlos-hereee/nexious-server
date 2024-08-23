import Post from "@db/schema/post";
import Messages from "@db/schema/messages";

interface PotsFilters {
  appId?: string;
  postId?: string;
  all?: boolean;
  messageId?: string;
}
export const getPosts = async ({ appId }: PotsFilters) => {
  if (appId) return await Post.find({ appId });
  return await Post.find().populate({ path: "comments", populate: { path: "replies" }, options: { strictPopulate: false } });
};
export const getPost = async ({ postId }: PotsFilters) => {
  if (postId) return await Post.findOne({ postId });
  return null;
};

export const getMessage = async ({ messageId }: PotsFilters) => {
  if (messageId) return await Messages.findOne({ messageId });
  return null;
};
