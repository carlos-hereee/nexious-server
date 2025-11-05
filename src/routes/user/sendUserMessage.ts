import { UserRequest } from "@app/request";
import { getUser } from "@db/models/users/getUser";
import Messages from "@db/schema/messages";
import { generateUsername } from "@utils/app/generateStr";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const sendUserMessage = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const recipientUser = await getUser({ userId: req.params.userId });

    if (!recipientUser) return res.status(400).json("unable to fiend recipient").end();

    const user = { userId: req.user.userId, avatar: req.user.avatar, name: generateUsername(req.user) };
    const recipient = { userId: recipientUser.userId, avatar: recipientUser.avatar, name: generateUsername(recipientUser) };
    // // create message
    const message = await Messages.create({ ...req.body, user, recipientRole: "friend", recipient });
    // // link message
    req.user.messages.push(message._id);
    recipientUser.messages.push(message._id);
    // save to db
    await req.user.save();
    if (req.user.userId !== recipientUser.userId) await recipientUser.save();

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to contact message");
  }
};
