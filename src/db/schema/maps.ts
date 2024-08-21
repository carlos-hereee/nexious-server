import { IMapSchema } from "@app/app";
import mongoose from "mongoose";
import { v4 } from "uuid";

const Schema = mongoose.Schema;
const mapSchema = new Schema<IMapSchema>(
  {
    // key variables
    uid: { type: String, default: v4 },
    name: { type: String, default: "" },
    map: {
      type: [
        [
          {
            id: { type: String },
            data: { type: String },
            orientation: { type: String },
            x: { type: Number },
            y: { type: Number },
          },
        ],
      ],
      default: [],
    },
    dimensions: {
      width: { type: Number, default: 0 },
      length: { type: Number, default: 0 },
      unit: { type: String, default: "cm" },
    },
  },
  { timestamps: true }
);
const Maps = mongoose.model("Maps", mapSchema);
export default Maps;
