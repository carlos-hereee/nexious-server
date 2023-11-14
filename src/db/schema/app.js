const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appSchema = new Schema(
  {
    appId: { type: String, require: true },
    appName: { type: String, unique: true },
    logo: { type: Schema.Types.ObjectId, ref: "Hero" },
    ownerId: { type: Schema.Types.ObjectId, ref: "Users" },
    adminIds: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    locale: { type: String },
    languageList: [
      {
        name: { type: String },
        label: { type: String },
        value: { type: String },
        url: { type: String },
        locale: { type: String },
        uid: { type: String },
      },
    ],
    themeList: [
      {
        name: { type: String },
        value: { type: String },
        label: { type: String },
        themeId: { type: String },
        uid: { type: String },
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
      cta: [{ label: { type: String }, link: { type: String }, icon: { type: String } }],
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
      medias: [{ media: { type: String }, link: { type: String } }],
    },
    menu: [
      {
        menuId: { type: String },
        isToggle: { type: Boolean, default: false },
        isPrivate: { type: Boolean, default: false },
        // menuItemId === heroId
        active: { type: Schema.Types.ObjectId, ref: "Hero" },
        alternatives: [{ type: Schema.Types.ObjectId, ref: "Hero" }],
      },
    ],
    calendar: {
      name: { type: String },
      theme: { type: String },
      calendarId: { type: String },
      events: [{ eventId: { type: String } }],
    },
  },
  { timestamps: true }
);
const App = mongoose.model("App", appSchema);
module.exports = App;
