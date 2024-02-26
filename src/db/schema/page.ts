import type { IPageSchema } from "@app/page";
import mongoose from "mongoose";
import { v4 } from "uuid";
import data from "@db/data/lorem.json";

const Schema = mongoose.Schema;

const pageSchema = new Schema<IPageSchema>(
  {
    pageId: { type: String, require: true, unique: true, default: v4 },
    type: { type: String, require: true, default: "page" },
    title: { type: String, default: `${data.title}` },
    body: { type: String, default: `${data.body}` },
    hero: { type: String, default: "" },
    tagline: { type: String },
    name: { type: String, default: "Lorem" },
    isStore: { type: Boolean, default: false },
    hasCta: { type: Boolean, default: false },
    hasSections: { type: Boolean, default: false },
    sections: [
      {
        title: { type: String, default: `${data.sectionTitle}` },
        sectionHero: { type: String },
        body: { type: String, default: `${data.sectionBody}` },
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
export default Page;
