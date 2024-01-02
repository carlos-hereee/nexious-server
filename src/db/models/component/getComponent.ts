const Component = require("../../schema/component");

module.exports = async ({ componentId }) => {
  if (componentId) {
    return await Component.findOne({ componentId });
  }
};
