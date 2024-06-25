import { createNotification } from "@db/models/notification/createNotification";
import { FormatNotification } from "@app/app";
import { NotificationSchema } from "@app/db";

// create notification
export const addNotification = async ({ type, message, link }: FormatNotification) => {
  const data: NotificationSchema = { category: "user", message: message || "", link: link || "", name: "" };
  if (type === "add-merch") {
    data.category = "store-merch";
    data.name = "A new merchandise was added";
  }
  if (type === "edit-user") {
    data.category = "user";
    data.name = "Account updated";
  }
  if (type === "app-update") {
    data.category = "app";
    data.name = "App udpate success";
  }
  if (type === "order-paid") {
    data.category = "orders";
    data.name = "Order paid";
  }
  if (type === "edit-calendar") {
    data.category = "app";
    data.name = "Updated calendar";
  }
  if (type === "order-in-store") {
    data.category = "orders";
    data.name = "Order submitted";
    data.message = `Client placed an order`;
  }
  if (type === "edit-merch") {
    data.category = "orders";
    data.name = "Merchandise update";
  }

  return await createNotification(data);
};
