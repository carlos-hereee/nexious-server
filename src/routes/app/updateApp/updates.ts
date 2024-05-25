import { IAppSchema, IMenu } from "@app/app";

interface InitAppMenu extends IMenu {
  isBooking?: boolean;
  isStore?: boolean;
}

const initAppVersions = (app: IAppSchema) => {
  app.dbVersion = "1.0.1";
  app.appUrl = app.appName.split(" ").join("+");
  app.menu = app.menu.map((m: InitAppMenu) => {
    const { uid, menuId, label, value, isBooking, isStore, icon } = m;
    // app link should point to app url
    if (isStore || value === "store") {
      return { uid, menuId, value, icon, label: "store", category: "store", link: "/store/" + app.appUrl };
    }
    if (isBooking || value === "booking") {
      return { uid, menuId, value, icon, label: "calendar", category: "calendar", link: "/booking/" + app.appUrl };
    }
    const link = "/app/" + app.appUrl + "/" + m.value.split(" ").join("+");
    return { uid, menuId, label, value, icon, category: "page", link };
  });
};

export const updates = (app: IAppSchema) => {
  // if initialize db versions if needed
  if (!app.dbVersion || app.dbVersion === "1.0.0") return initAppVersions(app);
};
