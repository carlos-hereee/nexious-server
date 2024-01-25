import mongoose from "mongoose";
import { port, uri, isDev } from "@config";
import type { MongoError } from "mongodb";
import type { Express } from "express";

// mongoose no longer requires these options
// const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export const connectMongoose = async (app: Express) => {
  try {
    await mongoose.connect(uri);
    app.listen(port, () => {
      if (isDev) console.log(`\n\n*** Server listening on port: ${port} ***\n\n`);
    });
  } catch (error) {
    const err = error as MongoError;
    if (isDev) console.log("\n\n*** An error was found***\n\n", err.stack, "\n\n");
  }
};
