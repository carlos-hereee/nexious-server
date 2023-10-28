const { mongoose } = require("mongoose");
const { port, uri, isDev } = require("../../config.env");

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = async (app) => {
  try {
    await mongoose.connect(uri, dbOptions);
    app.listen(port, () => {
      if (isDev) console.log(`\n\n*** Server listening on port: ${port} ***\n\n`);
    });
  } catch (error) {
    if (isDev) console.log("\n\n*** An error was found***\n\n", error.stack, "\n\n");
  }
};
