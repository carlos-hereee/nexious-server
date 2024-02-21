import mongoose from "mongoose";
import { uri } from "@utils/app/config";
// import type { MongoError } from "mongodb";
// import type { StatusPayload } from "@app/errors";

// mongoose no longer requires these options
// const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export const connectMongoose = async () => mongoose.connect(uri);
// }
// try {
//   return { status: "success" };
// } catch (error) {
//   const err = error as MongoError;
//   if (isDev) console.log("\n\n*** An error was found***\n\n", err.stack, "\n\n");
//   return { status: "error" };
// };
