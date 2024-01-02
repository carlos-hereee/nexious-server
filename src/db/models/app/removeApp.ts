const App = require("../../schema/app");

export = async ({ appId }) => {
  return await App.findOneAndDelete({ appId });
};
