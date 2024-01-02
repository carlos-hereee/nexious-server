const App = require("../../schema/app");

export = async ({ appId }, payload) => {
  return await App.updateOne({ appId }, { $set: payload });
};
