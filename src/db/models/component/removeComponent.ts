const Component = require("../../schema/component");

module.exports = async ({ componentId }) => {
  return await Component.findOneAndDelete({ componentId });
};
