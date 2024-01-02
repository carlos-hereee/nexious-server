const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4 } = require("uuid");

const pageSchema = new Schema(
  {
    pageId: { type: String, require: true, unique: true, default: v4 },
    userId: { type: String, require: true },
    appId: { type: String, require: true },
    // locale: { type: String, require: true },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    hero: { type: String, default: "" },
    name: { type: String, default: "" },
    isStore: { type: Boolean, default: false },
    hasCta: { type: Boolean, default: false },
    hasSections: { type: Boolean, default: false },
    sections: [
      {
        title: { type: String },
        sectionHero: { type: String },
        body: { type: String },
        uid: { type: String, default: v4 },
      },
    ],
    cta: [
      {
        label: { type: String },
        link: { type: String },
        icon: { type: String },
        uid: { type: String, default: v4 },
      },
    ],
  },
  { timestamps: true }
);
const Page = mongoose.model("Pages", pageSchema);
export  Page;
