import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { connectMongoose } from "./db/connectMongoose";
import { clientUrl, clientUrlAlt, allowedMethods } from "@config";
import { deserializeUser } from "./middleware/auth";

// configure envs
dotenv.config();
// create an express app
const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: [clientUrl, clientUrlAlt], methods: allowedMethods }));
// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status ? res.status : res.status(500);
//   res.json(error);
// });
// middleware for all functions
app.use(deserializeUser);

const main = () => {
  connectMongoose(app);
  routes(app);
};

// init app
main();
