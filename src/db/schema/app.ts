import type { IAppSchema } from "@app/app";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const appSchema = new Schema<IAppSchema>(
  {
    // TODO: MOVE STRIPE ACCOUNT ID TO APP SCHEMA
    appId: { type: String, require: true, default: v4 },
    appName: { type: String, unique: true },
    locale: { type: String },
    isFeatured: { type: Boolean },
    country: { type: String },
    email: { type: String, require: true },
    appUrl: { type: String },
    appLink: { type: String },
    logo: { type: String, default: "" },
    owner: { type: Schema.Types.ObjectId, ref: "Users" },
    adminIds: [{ userId: { type: String, ref: "Users" }, role: { type: String } }],
    languageList: [
      {
        name: { type: String },
        label: { type: String },
        value: { type: String },
        url: { type: String },
        locale: { type: String },
        uid: { type: String, default: v4 },
      },
    ],
    themeList: [
      {
        name: { type: String },
        value: { type: String },
        label: { type: String },
        themeId: { type: String },
        uid: { type: String, default: v4 },
        colors: {
          primary: { type: String },
          altPrimary: { type: String },
          secondary: { type: String },
          altSecondary: { type: String },
        },
        backgroundColors: {
          primary: { type: String },
          altPrimary: { type: String },
          secondary: { type: String },
          altSecondary: { type: String },
        },
      },
    ],
    landing: { type: Schema.Types.ObjectId, ref: "Pages" },
    newsletter: {
      title: { type: String, default: "Join the newsletter" },
      subtitle: { type: String, default: "Suscribe to get the latest content by email" },
      details: { type: String, default: "Unsubscribe at any time." },
      hero: { type: String, default: "" },
    },
    media: {
      title: { type: String, default: "Dont miss a thing! Follow us on our socials" },
      subtitle: { type: String, default: "" },
      hasMedias: { type: Boolean, default: false },
      hero: { type: String, default: "" },
      medias: {
        type: [
          {
            media: { type: String, default: "" },
            link: { type: String, default: "" },
            username: { type: String, default: "" },
            url: { type: String, default: "" },
            uid: { type: String, default: v4 },
          },
        ],
        default: [],
      },
    },
    menu: [
      {
        category: { type: String, required: true },
        // menuId = pageId/storeId
        menuId: { type: String },
        // uid = universal id
        uid: { type: String, default: v4 },
        value: { type: String },
        link: { type: String },
        label: { type: String },
        icon: { type: String },
      },
    ],
    calendar: { type: Schema.Types.ObjectId, ref: "Calendar" },
    pages: { type: [{ type: Schema.Types.ObjectId, ref: "Pages" }], default: [] },
    notifications: { type: [{ type: Schema.Types.ObjectId, ref: "Notification" }], default: [] },
    archivedNotifications: { type: [{ type: Schema.Types.ObjectId, ref: "Notification" }], default: [] },
    subscribers: { type: [{ type: Schema.Types.ObjectId, ref: "Users" }], default: [] },
    subscriptions: { type: [{ type: Schema.Types.ObjectId, ref: "Subscription" }], default: [] },
    store: { type: Schema.Types.ObjectId, ref: "Store" },
    dbVersion: { type: Schema.Types.String },
  },
  { timestamps: true }
);
const App = mongoose.model("App", appSchema);
export default App;
