const Component = require("../../schema/component");

module.exports = async (payload) => {
  // const component = new Component(payload);
  return await Component.create(payload);
};
