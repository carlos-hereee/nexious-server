import { NotificationSchema } from "@app/db";
import { IStoreSchema, MerchSchema } from "@app/store";
import { IUserSchema } from "@app/user";
import { generateStringUrl } from "../generateUrl";

interface FormatNotification {
  type: "add-merch" | "edit-user" | "order-paid" | "order-in-store";
  user?: IUserSchema;
  merch?: MerchSchema;
  store?: IStoreSchema;
}
export const formatNotification = ({ type, store, merch }: FormatNotification): NotificationSchema => {
  const data: NotificationSchema = { category: "user", message: "", link: "", name: "" };
  if (type === "add-merch") {
    // require params
    if (!store) throw Error("store is required");
    if (!merch) throw Error("merch is required");
    data.category = "store-merch";
    data.name = "A new merchandise was added";
    data.message = `${store.storeName || ""} added ${merch.inStock} to their iventory`;
    data.link = `/store/${generateStringUrl(store?.storeName || "")}/${generateStringUrl(merch.name)}`;
  }
  if (type === "edit-user") {
    data.category = "user";
    data.name = "Account updated";
    data.message = `Succesfully updated account`;
    data.link = "";
  }
  if (type === "order-paid") {
    data.category = "orders";
    data.name = "Order paid";
    data.message = `Client made a succesfull payment `;
    data.link = "";
  }
  if (type === "order-in-store") {
    data.category = "orders";
    data.name = "Order submitted";
    data.message = `Client placed an order`;
    data.link = "";
  }
  return data;
};
