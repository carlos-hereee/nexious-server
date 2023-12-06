const mongoose = require("mongoose");
const { v4 } = require("uuid");
const Schema = mongoose.Schema;

const appSchema = new Schema(
  {
    appId: { type: String, require: true, default: v4 },
    appName: { type: String, unique: true },
    logo: { type: String },
    // logo: { type: Schema.Types.ObjectId, ref: "Hero" },
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
      title: { type: String, default: "" },
      tagline: { type: String, default: "" },
      body: { type: String, default: "" },
      hasCta: { type: Boolean, default: false },
      hasSections: { type: Boolean, default: false },
      hero: { type: String, default: "" },
      cta: [
        {
          label: { type: String },
          link: { type: String },
          icon: { type: String },
          uid: { type: String, default: v4 },
        },
      ],
      sections: [
        {
          title: { type: String },
          hero: { type: String },
          body: { type: String },
          uid: { type: String, default: v4 },
        },
      ],
    },
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
        isPage: { type: Boolean, default: false },
        name: { type: String },
        value: { type: String },
        link: { type: String },
        label: { type: String },
        icon: { type: String },
        hero: { type: String },
        // locale: { type: String },
        // active: {
        //   name: { type: String },
        //   value: { type: String },
        //   locale: { type: String },
        //   link: { type: String },
        //   label: { type: String },
        //   menuItemId: { type: String },
        //   icon: { type: String },
        //   uid: { type: String },
        // },
        // alternatives: [
        //   {
        //     locale: { type: String },
        //     link: { type: String },
        //     name: { type: String },
        //     value: { type: String },
        //     icon: { type: String },
        //     label: { type: String },
        //     menuItemId: { type: String },
        //     uid: { type: String },
        //   },
        // ],
      },
    ],
    calendar: { type: Schema.Types.ObjectId, ref: "Calendar" },
    pages: [{ type: Schema.Types.ObjectId, ref: "Pages" }],
  },
  { timestamps: true }
);
const App = mongoose.model("App", appSchema);
module.exports = App;
