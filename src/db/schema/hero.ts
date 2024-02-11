import mongoose from "mongoose";
import { toLowerCase } from "@utils/app/lowerCase";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const heroSchema = new Schema(
  {
    // key variables
    uid: { type: String, require: true, unique: true, default: v4 },
    heroId: { type: String, default: v4 },
    // asset
    small: { type: String },
    url: { type: String },
    alt: { type: String },
    link: { type: String },
    icon: { type: String, set: toLowerCase },
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
    creditTo: {
      artistName: { type: String },
      artistUrl: { type: String },
      assetUrl: { type: String },
    },
  },
  { timestamps: true }
);
const Hero = mongoose.model("Hero", heroSchema);
export default Hero;
