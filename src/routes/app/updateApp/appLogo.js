const { v4 } = require("uuid");
const updateHero = require("../../../db/models/hero/updateHero");
const formatLogoData = require("../../../utils/app/formatLogoData");

module.exports = async (req, res) => {
  // check if app logo has logo
  const appName = req.body.appName;
  const refId = req.app.logo;
  // logo payload
  const logo = formatLogoData(appName, req.file);
  //  updating previous logo
  if (refId) {
    const id = await updateHero({ refId }, logo);
    req.app.logo = id;
  } else {
    //  create a new logo
    const heroId = v4();
    const id = await updateHero({ heroId }, { ...logo, heroId });
    req.app.logo = id;
  }
  await req.app.save();
  res.status(200).json(req.app).end();
};
