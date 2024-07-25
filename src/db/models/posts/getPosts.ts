import Post from "@db/schema/post";

interface PotsFilters {
  appId?: string;
  all?: boolean;
}
export const getPosts = async ({ appId }: PotsFilters) => {
  if (appId) return await Post.find({ appId });
  return await Post.find();
};
