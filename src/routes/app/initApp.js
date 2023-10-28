const { v4 } = require("uuid");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const createApp = require("../../db/models/app/createApp");
// const getApp = require("../../db/models/app/getApp");
// const getUser = require("../../db/models/users/getUser");

// menu items values saved in Hero db
// const menuItem = ({ heroId, name, link, icon }) => {
//   return { heroId, name, link, label: name, icon, type: "menu-item" };
// };
module.exports = async (req, res) => {
  try {
    // key variables
    const appName = req.body.appName || req.parms.appName;
    const userId = req.user._id;
    const appId = v4();
    const logo = req.logoId;
    // init app
    const appPayload = { appName, logo, appId, ownerId: userId, adminIds: [userId] };
    const app = await createApp(appPayload);
    req.app = app;
    // update user   ownedApps
    req.user.ownedApps = [...req.user.ownedApps, app._id];
    // add user permissions
    req.user.permissions = [...req.user.permissions, { appId: app._id, role: "owner" }];
    req.user.save();
    // const appList = await getApp({ all: true });
    // const user = await getUser({ userId: req.user.userId });

    // res.status(200).json({ user, app: req.app, appList }).end();
    // const landingPage = req.body.logo;
    //   // remove false values
    //   const landing = {
    //     ...landingPage,
    //     cta: !landingPage.cta ? null : landingPage.cta,
    //     sections: !landingPage.sections ? [] : landingPage.sections,
    //   };
    //   const languageId = req.user.languageId || "";
    //   const loginData = { name: "login", link: "login", icon: "user", heroId: ids.loginId };
    //   const dashData = { name: "dashboard", link: "dashboard", icon: "user" };
    //   const loginPayload = menuItem({ ...loginData, menuItemId: ids.loginId });
    //   const dashPayload = menuItem({
    //     ...dashData,
    //     menuItemId: ids.dashId,
    //     heroId: ids.dashId,
    //   });
    //   // save app menu item assets values
    //   const login = await saveHero(loginPayload);
    //   const dash = await saveHero(dashPayload);
    //   // init app
    //   const app = await saveApp({
    //     appId: ids.appId,
    //     languageId,
    //     appName,
    //     ownerId: req.user._id,
    //     adminIds: [req.user._id],
    //     themeList: ["light-mode", "dark-mode"],
    //     landing,
    //     menu: [
    //       {
    //         menuId,
    //         isPrivate: true,
    //         active: login._id,
    //         alternatives: [login._id, dash._id],
    //       },
    //     ],
    //     calendar: { name: appName, calendarId: v4(), events: [] },
    //   });
  } catch (error) {
    useGenericErrors(res, error, "app build error: ");
  }
};
