import { UserRequest } from "@app/request";
import { getMessage } from "@db/models/posts/getPosts";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const getUserMessage = async (req: UserRequest, res: Response) => {
  try {
    const message = await getMessage({ id: req.params.messageId });
    // message = null;
    if (!message) return res.status(404).json({ error: "Message not found" }).end();
    // populate the user and replies
    await message.populate("replies");
    return res.status(200).json(message).end();
  } catch (error) {
    useGenericErrors(res, error, "Error in getUserMessage function");
  }
};
