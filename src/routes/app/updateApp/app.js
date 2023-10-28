const formatFormData = require("../../../utils/app/formatFormData");

module.exports = async (req, res) => {
  // key variables
  // const { appName, landingPage, appId } = req.body;
  // format data
  const appName = formatFormData(req.body.appName);

  const landingPage = formatFormData(req.body.landingPage);
  console.log("appName", appName);
  console.log("landingPage", landingPage);
  // const landingPageValue = {
  //   tagline: formatFormData(req.body.landingPage.tagline),
  //   body: formatFormData(req.body.landingPage.body),
  //   hasCta: formatFormData(req.body.landingPage.hasCta),
  //   hasSections: formatFormData(req.body.landingPage.hasSections),
  //   cta: landingPage.hasCta && formatFormData(landingPage.hasCta.group),
  //   sections: landingPage.hasSections && formatFormData(landingPage.hasSections.group),
  // };
  // console.log("appId", appId);
  // console.log("appName", appName);
  // console.log("landingPageValue", landingPageValue);
  // TODO: add cta and sections to hero db schema
  // update app
};
