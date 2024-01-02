const Hero = require("../../schema/hero");

module.exports = async ({ heroId }) => {
  return await Hero.findOneAndDelete({ heroId });
};
