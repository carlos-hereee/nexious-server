import { UserRequest } from "@app/request";
import { getMessage } from "@db/models/posts/getPosts";
import { getUser } from "@db/models/users/getUser";
import Messages from "@db/schema/messages";
import { generateUsername } from "@utils/app/generateStr";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const sendReply = async (req: UserRequest<{ data: string }>, res: Response, next: NextFunction) => {
  try {
    const { userId, messageId } = req.params;
    // Find recipient user
    const recipientUser = await getUser({ userId });
    if (!recipientUser) return res.status(400).json("unable to fiend recipient").end();

    // Find message to reply to
    const msg = await getMessage({ uid: messageId });
    if (!msg) return res.status(400).json("unable to find message").end();

    // Create reply
    const user = { userId: req.user.userId, avatar: req.user.avatar, name: generateUsername(req.user) };
    const recipient = { userId: recipientUser.userId, avatar: recipientUser.avatar, name: generateUsername(recipientUser) };
    const reply = await Messages.create({ ...req.body, user, recipient, recipientRole: "friend" });

    // Append reply to user's replies
    msg.replies.push(reply._id);
    req.message = msg;
    await msg.save();

    // req.user.messages.push(reply._id);

    // save to db
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to send reply");
  }
};
