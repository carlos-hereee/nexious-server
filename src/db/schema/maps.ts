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
            id: { type: String, default: v4 },
            data: { type: String, default: "" },
            roomType: { type: String, default: "" },
            orientation: { type: String, default: "zero-deg" },
            name: { type: String, default: "" },
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
