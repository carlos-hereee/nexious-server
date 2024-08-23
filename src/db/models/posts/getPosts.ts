import Post from "@db/schema/post";

interface PotsFilters {
  appId?: string;
  postId?: string;
  all?: boolean;
}
export const getPosts = async ({ appId }: PotsFilters) => {
  if (appId) return await Post.find({ appId });
  return await Post.find().populate("comments", { options: { strictPopulate: false } });
};
export const getPost = async ({ postId }: PotsFilters) => {
  if (postId) return await Post.findOne({ postId });
  return null;
};
