import { AuthRequest } from "@app/request";
import { NextFunction, Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { addNotification } from "@utils/app/addNotification";
import { IAuth } from "@app/auth";
import { createCheckoutSession } from "@utils/stripe/payments/createCheckoutSession";

export const editUser = async (req: AuthRequest<IAuth>, res: Response, next: NextFunction) => {
  try {
    const { username, email, phone, nickname, accountTier, name } = req.body;
    // update user data if changes
    if (username !== req.user.username) req.user.username = username;
    if (email !== req.user.email) req.user.email = email;
    if (phone !== req.user.phone) req.user.phone = phone;
    if (nickname !== req.user.nickname) req.user.nickname = nickname;
    if (name !== req.user.name) req.user.name = name;
    if (accountTier && accountTier.tier !== req.user.accountTier.tier) {
      // redirect user if account upgrade when upgrading account
      if (accountTier.tier !== "free") {
        const subscriptionInfo = [{ merchId: "", priceId: "", quantity: 1, productId: "" }];
        const session = await createCheckoutSession({ cart: subscriptionInfo, accountId: "", mode: "subscription" });
        console.log("session :>> ", session);
      }
      req.user.accountTier = accountTier;
    }
    // create notification
    const notification = await addNotification({ type: "edit-user", message: "Successfully updated account" });
    if (notification) req.user.notifications.push(notification._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to update password");
  }
};
