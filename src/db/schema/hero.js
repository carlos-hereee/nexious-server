const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/app/lowerCase");
const { v4 } = require("uuid");

const heroSchema = new Schema(
  {
    // key variables
    uid: { type: String, require: true, unique: true, default: v4 },
    heroId: { type: String, default: v4 },
    // hero detail data
    title: { type: String },
    data: { type: String },
    body: { type: String },
    heading: { type: String },
    // asset
    small: { type: String },
    url: { type: String },
    alt: { type: String },
    link: { type: String },
    icon: { type: String, set: toLower },
    name: { type: String },
    label: { type: String },
    sharedKey: { type: String },
    hero: { type: String },
    ping: { type: Number },
    // multer options
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    destination: { type: String },
    filename: { type: String },
    path: { type: String },
    size: { type: Number },
    // 3rd party asset
    creditTo: {
      artistName: { type: String },
      artistUrl: { type: String },
      assetUrl: { type: String },
    },
  },
  { timestamps: true }
);
const Hero = mongoose.model("Hero", heroSchema);
module.exports = Hero;
