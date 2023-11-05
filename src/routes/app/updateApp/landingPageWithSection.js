const { v4 } = require("uuid");
const updateHero = require("../../../db/models/hero/updateHero");
const formatAssetData = require("../../../utils/app/format/formatAssetData");
const formatFormData = require("../../../utils/app/format/formatFormData");
const updateApp = require("../../../db/models/app/updateApp");
const getApp = require("../../../db/models/app/getApp");

module.exports = async (req, res) => {
  const hero = req.file;
  // format app landing page data
  const formData = formatFormData(req.body);
  const formatSectionHero = formatAssetData(hero, ...formData.sections);
  const sectionHero = await updateHero(
    { heroId: formatSectionHero.heroId },
    { ...formatSectionHero }
  );
  const ctaHero = await updateHero({ heroId: v4() }, ...formData.cta);
  const appPayload = {
    ...formData,
    cta: ctaHero.upsertedId,
    sections: sectionHero.upsertedId,
  };
  await updateApp({ appId: req.app.appId }, { landing: appPayload });
  // finally send app data
  const app = await getApp({ appId: req.app.appId });
  res.status(200).json(app).end();
};
