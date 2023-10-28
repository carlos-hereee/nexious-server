const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/lowerCase");

const componentSchema = new Schema(
  {
    componentId: { type: String, require: true, unique: true },
    pageId: { type: String, require: true, unique: true },
    heroId: { type: String, unique: true },
    languageId: { type: String, unique: true },
    title: { type: String },
    body: { type: String },
    response: { type: String },
    name: { type: String },
    theme: { type: String },
    type: { type: String },
    list: [
      {
        heroId: { type: String, unique: true },
        uid: { type: String, unique: true },
        name: { type: String },
        icon: { type: String, set: toLower },
        theme: { type: String },
        name: { type: String },
        title: { type: String },
        body: { type: String },
      },
    ],
    cta: [
      {
        uid: { type: String, unique: true },
        icon: { type: String, set: toLower },
        label: { type: String },
        name: { type: String },
        title: { type: String },
        theme: { type: String },
      },
    ],
  },
  { timestamps: true }
);
const Component = mongoose.model("Component", componentSchema);
module.exports = Component;
