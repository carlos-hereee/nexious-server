const App = require("../../schema/app");

module.exports = async ({ appId }, payload) => {
  return await App.updateOne({ appId }, { $set: payload });
};
