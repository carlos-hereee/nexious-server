import Messages from "@db/schema/messages";
import Post from "@db/schema/post";

interface PotsFilters {
  appId?: string;
  postId?: string;
  uid?: string;
  id?: string;
  all?: boolean;
  limit?: number;
  page?: number;
  messageId?: string;
}
export const getPosts = async ({ appId, limit = 5, page = 0 }: PotsFilters) => {
  if (appId) {
    return await Post.find({ appId })
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit)
      .skip(page * limit);
  }
  return await Post.find()
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit)
    .skip(page * limit);
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
