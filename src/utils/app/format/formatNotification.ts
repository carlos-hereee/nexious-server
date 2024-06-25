import { NotificationSchema } from "types/db";
import { IStoreSchema, MerchSchema } from "types/store";
import { IUserSchema } from "types/user";
import { generateStringUrl } from "../generateUrl";

interface FormatNotification {
  type: "add-merch" | "edit-user" | "order-paid" | "order-in-store" | "edit-merch";
  user?: IUserSchema;
  merch?: MerchSchema;
  store?: IStoreSchema;
  message?: string;
}
export const formatNotification = ({ type, store, merch, message }: FormatNotification): NotificationSchema => {
  const data: NotificationSchema = { category: "user", message: "", link: "", name: "" };
  if (type === "add-merch") {
    // require params
    if (!store) throw Error("store is required");
    if (!merch) throw Error("merch is required");
    data.category = "store-merch";
    data.name = "A new merchandise was added";
    data.message = message || `${store.storeName || ""} added ${merch.inStock} to their iventory`;
    data.link = `/store/${generateStringUrl(store?.storeName || "")}/${generateStringUrl(merch.name)}`;
  }
  if (type === "edit-user") {
    data.category = "user";
    data.name = "Account updated";
    data.message = message || `Succesfully updated account`;
    data.link = "";
  }
  if (type === "order-paid") {
    data.category = "orders";
    data.name = "Order paid";
    data.message = message || `Client made a succesfull payment `;
    data.link = "";
  }
  if (type === "order-in-store") {
    data.category = "orders";
    data.name = "Order submitted";
    data.message = `Client placed an order`;
    data.link = "";
  }
  if (type === "edit-merch") {
    data.category = "orders";
    data.name = "Merchandise update";
    data.message = message || `Merch update`;
    data.link = "";
  }
  return data;
};
