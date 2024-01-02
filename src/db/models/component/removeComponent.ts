const Component = require("../../schema/component");

export = async ({ componentId }) => {
  return await Component.findOneAndDelete({ componentId });
};
