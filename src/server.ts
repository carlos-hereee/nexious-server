import express, { json, urlencoded } from "express";
import cors from "cors";
import { config } from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import routes from "@routes/index";
import { connectMongoose } from "@db/connectMongoose";
import { clientUrl, clientUrlAlt, allowedMethods, port, isDev } from "@utils/app/config";
import { deserializeUser } from "@middleware/auth/deserializeUser";

// configure envs
// dotenv.config();
config();
// create an express app
const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: [clientUrl, clientUrlAlt], methods: allowedMethods }));
// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status ? res.status : res.status(500);
//   res.json(error);
// });
// middleware for all functions
// TODO: DEBUG ERROR
// app.use(deserializeUser as unknown as RequestHandler);
app.use(deserializeUser);

void connectMongoose().then(({ status }) => {
  if (status === "success") {
    // init app
    app.listen(port, () => {
      if (isDev) console.log(`\n\n*** Server listening on port: ${port} ***\n\n`);
      routes(app);
    });
  }
  if (status === "error") {
    if (isDev) console.log("..Aborting ");
  }
});
