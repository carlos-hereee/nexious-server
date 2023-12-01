const Hero = require("../../schema/hero");

module.exports = async ({ heroId, filename }) => {
  if (filename) {
    return await Hero.findOne({ filename });
  }
  if (heroId) {
    return await Hero.findOne({ heroId });
  }
};
