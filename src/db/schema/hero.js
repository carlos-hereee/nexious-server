const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const toLower = require("../../utils/app/lowerCase");

const heroSchema = new Schema(
  {
    // key variables
    heroId: { type: String, require: true, unique: true },
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
    credit: {
      artistName: { type: String },
      artistUrl: { type: String },
      assetUrl: { type: String },
    },
  },
  { timestamps: true }
);
const Hero = mongoose.model("Hero", heroSchema);
module.exports = Hero;
