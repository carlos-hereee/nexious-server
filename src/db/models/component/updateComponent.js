const Component = require("../../schema/component");

module.exports = async ({ componentId }, payload) => {
  return await Component.updateOne({ componentId }, { $set: payload });
};
