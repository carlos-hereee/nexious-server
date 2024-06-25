import { NotificationSchema } from "types/db";
import { generateStringUrl } from "../generateUrl";
import { FormatNotification } from "@app/app";

export const formatNotification = ({ type, store, merch, message }: FormatNotification): NotificationSchema => {
  const data: NotificationSchema = { category: "user", message: message || "", link: "", name: "" };
  if (type === "add-merch") {
    // require params
    if (!store) throw Error("store is required");
    if (!merch) throw Error("merch is required");
    data.category = "store-merch";
    data.name = "A new merchandise was added";
    data.link = `/store/${generateStringUrl(store?.storeName || "")}/${generateStringUrl(merch.name)}`;
  }
  if (type === "edit-user") {
    data.category = "user";
    data.name = "Account updated";
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
  return data;
};
