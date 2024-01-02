const Component = require("../../schema/component");

export = async ({ componentId }) => {
  if (componentId) {
    return await Component.findOne({ componentId });
  }
};
