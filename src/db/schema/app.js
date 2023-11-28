const mongoose = require("mongoose");
const { v4 } = require("uuid");
const Schema = mongoose.Schema;

const appSchema = new Schema(
  {
    appId: { type: String, require: true, default: v4 },
    appName: { type: String, unique: true },
    logo: { type: Schema.Types.ObjectId, ref: "Hero" },
    owner: { type: Schema.Types.ObjectId, ref: "Users" },
    adminIds: [{ userId: { type: Schema.Types.ObjectId, ref: "Users" }, role: { type: String } }],
    locale: { type: String },
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
    landing: {
      title: { type: String },
      tagline: { type: String },
      body: { type: String },
      hasCta: { type: Boolean },
      hasSections: { type: Boolean },
      hero: { type: Schema.Types.ObjectId, ref: "Hero" },
      cta: [
        {
          label: { type: String },
          link: { type: String },
          icon: { type: String },
          uid: { type: String, default: v4 },
        },
      ],
      sections: [{ type: Schema.Types.ObjectId, ref: "Hero" }],
    },
    newsletter: {
      title: { type: String, default: "Join the newsletter" },
      subtitle: { type: String, default: "Suscribe to get the latest content by email" },
      details: { type: String, default: "Unsubscribe at any time." },
      email: { type: String },
      hero: { type: Schema.Types.ObjectId, ref: "Hero" },
    },
    media: {
      title: { type: String, default: "Dont miss a thing! Follow us on our socials" },
      subtitle: { type: String },
      hasMedias: { type: Boolean },
      hero: { type: Schema.Types.ObjectId, ref: "Hero" },
      medias: [
        {
          media: { type: String },
          link: { type: String },
          sharedKey: { type: String },
          uid: { type: String, default: v4 },
        },
      ],
    },
    menu: [
      {
        menuId: { type: String, default: v4 },
        uid: { type: String, default: v4 },
        category: { type: String, required: true },
        isToggle: { type: Boolean, default: false },
        isPrivate: { type: Boolean, default: false },
        active: {
          name: { type: String },
          value: { type: String },
          locale: { type: String },
          link: { type: String },
          label: { type: String },
          menuItemId: { type: String },
          icon: { type: String },
          uid: { type: String },
        },
        alternatives: [
          {
            locale: { type: String },
            link: { type: String },
            name: { type: String },
            value: { type: String },
            icon: { type: String },
            label: { type: String },
            menuItemId: { type: String },
            uid: { type: String },
          },
        ],
      },
    ],
    calendar: { type: Schema.Types.ObjectId, ref: "Calendar" },
  },
  { timestamps: true }
);
const App = mongoose.model("App", appSchema);
module.exports = App;
