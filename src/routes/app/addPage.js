const { v4 } = require("uuid");
const { pagePayload, menuItemPayload } = require("../../middleware/app/pagePayload");
const savePage = require("../../db/models/page/savePage");
const updateApp = require("../../db/models/app/updateApp");
const updateUser = require("../../db/models/users/updateUser");

module.exports = async (req, res) => {
  try {
    // key variables
    let reqApp = req.app;
    let reqUser = req.user;
    const appId = reqApp.appId;
    const languageId = reqUser.languageId;
    const pageName = req.body.name;
    const reqBody = { ...req.body };
    // TODO: add hero to bd
    const heroId = req.file ? v4() : "";
    const payload = pagePayload(appId, languageId, reqBody, heroId);
    await savePage(payload);
    // add page to app data menu
    const menuItem = menuItemPayload(v4(), pageName, pageName);
    menu.push({ menuId: v4(), active: menuItem });
    // await updateApp({ appId }, req.app);
    // add admin edit powers
    // await updateUser({ userId }, { pagesOwned: [] });

    res.status(201).end();
  } catch (error) {
    console.log("error", error);
    res.status(500).end();
  }
};
