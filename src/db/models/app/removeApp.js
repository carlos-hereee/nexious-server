const App = require("../../schema/app");

module.exports = async ({ appId }) => {
  return await App.findOneAndDelete({ appId });
};
