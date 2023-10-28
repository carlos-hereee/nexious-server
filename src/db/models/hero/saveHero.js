const Hero = require("../../schema/hero");

module.exports = async (payload) => {
  const hero = await Hero.create(payload);
  return hero._id;
};
