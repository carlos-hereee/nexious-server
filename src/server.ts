require("dotenv").config();
import express  from "express";
import cors  from "cors";
import cookieParser  from "cookie-parser";
import helmet  from "helmet";
import routes  from "./routes";
import connectMongoose  from "./db/connectMongoose";
import { clientUrl, clientUrlAlt, isProduction }  from "../config.env";
import { deserializeUser }  from "./middleware/auth";

// create an express app
const app = express();

if (isProduction) app.set("trust proxy", 1);

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: [clientUrl, clientUrlAlt],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// // create publick file if doesnt not exsist for static assets
// if (!fs.existsSync("./public")) fs.mkdirSync("./public");
// // serve asset files
// app.use(express.static(__dirname + "public"));

// middleware for all functions
app.use(deserializeUser);

const main = () => {
  connectMongoose(app);
  routes(app);
};

// init app
main();
