import { IAppSchema, IMenu } from "@app/app";

interface InitAppMenu extends IMenu {
  isBooking?: boolean;
  isStore?: boolean;
}
const initAppVersions = (app: IAppSchema) => {
  app.dbVersion = "1.0.0";
  app.menu = app.menu.map((m: InitAppMenu) => {
    const { uid, menuId, link, label, value, isBooking, isStore, icon } = m;
    // app link should point to app url
    if (isStore) {
      return { uid, menuId, value, icon, label: "store", category: "store", link: "/store/" + app.appUrl };
    } else if (isBooking) {
      return { uid, menuId, value, icon, label: "calendar", category: "calendar", link: "/booking/" + app.appUrl };
    } else return { uid, menuId, label, value, icon, category: "page", link: "/app/" + app.appUrl + link };
  });
};

export const updates = (app: IAppSchema) => {
  // if initialize db versions if needed
  if (!app.dbVersion) return initAppVersions(app);
};
