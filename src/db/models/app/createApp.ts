const App = require("../../schema/app");

module.exports = async (payload) => {
  return await App.create(payload);
};
