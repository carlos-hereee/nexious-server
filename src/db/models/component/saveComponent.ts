const Component = require("../../schema/component");

export = async (payload) => {
  // const component = new Component(payload);
  return await Component.create(payload);
};
