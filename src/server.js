require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const routes = require("./routes");
const connectMongoose = require("./db/connectMongoose");
const { clientUrl, clientUrlAlt, isProduction } = require("../config.env");
const { deserializeUser } = require("./middleware/auth");

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
