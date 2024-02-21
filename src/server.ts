import express, { json, urlencoded } from "express";
import cors from "cors";
import { config } from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import routes from "@routes/index";
import { connectMongoose } from "@db/connectMongoose";
import { clientUrl, clientUrlAlt, allowedMethods } from "@utils/app/config";

// configure envs
config();
// create an express app
const app = express();
// options
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: [clientUrl, clientUrlAlt], methods: allowedMethods }));
// db connection
connectMongoose()
  .then(() => routes(app))
  .catch((error) => console.log("error :>> ", error));
