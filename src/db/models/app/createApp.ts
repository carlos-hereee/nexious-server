const App = require("../../schema/app");

export = async (payload) => {
  return await App.create(payload);
};
