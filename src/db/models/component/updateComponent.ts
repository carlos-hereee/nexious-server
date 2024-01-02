const Component = require("../../schema/component");

export = async ({ componentId }, payload) => {
  return await Component.updateOne({ componentId }, { $set: payload });
};
