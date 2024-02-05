import mongoose from "mongoose";
import { uri, isDev } from "@appUtils/config";
import type { MongoError } from "mongodb";
import type { StatusPayload } from "@app/errors";

// mongoose no longer requires these options
// const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export const connectMongoose = async (): Promise<StatusPayload> => {
  try {
    await mongoose.connect(uri);
    return { status: "success" };
  } catch (error) {
    const err = error as MongoError;
    if (isDev) console.log("\n\n*** An error was found***\n\n", err.stack, "\n\n");
    return { status: "error" };
  }
};
