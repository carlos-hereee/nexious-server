const { v4 } = require("uuid");
const updateHero = require("../../../db/models/hero/updateHero");
const formatFormData = require("../../../utils/app/format/formatFormData");
const formatPageData = require("../../../utils/app/format/formatPageData");
const useGenericErrors = require("../../../utils/auth/useGenericErrors");

module.exports = async (req, res) => {
  try {
    const formData = formatFormData(req.body);
    let { pageData, refs } = formatPageData(formData);
    for (let i = 0; i < refs.length; i++) {
      const current = refs[i];
      const heroId = current?.heroId || v4();
      // const hero = await updateHero({ heroId }, current);
      // console.log("hero", hero);
      // if (hero) {
      //   const groupName = pageData[current.groupName] || current.groupName;
      //   // save and store ref ids
      //   if (!pageData[groupName]) pageData[groupName] = hero;
      //   else pageData[groupName] = [...pageData[groupName], hero];
      // }
    }
    // req.app.landing = pageData;
    // await req.app.save();
    // res.status(200).json(req.app).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured updating lading page");
  }
};
