const Hero = require("../../schema/hero");

module.exports = async ({ heroId }) => {
  if (heroId) {
    return await Hero.findOne({ heroId });
  }
};
