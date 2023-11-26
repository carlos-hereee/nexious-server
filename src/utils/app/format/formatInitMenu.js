const { v4 } = require("uuid");

module.exports = () => {
  const themeListItemId = v4();
  const themeListItemUid = v4();
  const themeListItemThemeId = v4();

  const authItemId = v4();
  const authItemUid = v4();
  return [
    {
      isToggle: true,
      isPrivate: false,
      uid: v4(),
      menuId: v4(),
      active: {
        name: "dark-mode",
        value: "dark-mode",
        icon: "",
        link: "",
        locale: "",
        label: "dark-mode",
        themeId: themeListItemThemeId,
        menuItemId: themeListItemUid,
        uid: themeListItemId,
      },
      alternatives: [
        {
          name: "light-mode",
          value: "light-mode",
          label: "light-mode",
          themeId: v4(),
          menuItemId: v4(),
          icon: "",
          link: "",
          locale: "",
          uid: v4(),
        },
        {
          name: "dark-mode",
          value: "dark-mode",
          icon: "",
          link: "",
          locale: "",
          label: "dark-mode",
          themeId: themeListItemThemeId,
          menuItemId: themeListItemUid,
          uid: themeListItemId,
        },
      ],
    },
    {
      isToggle: false,
      isPrivate: true,
      uid: v4(),
      menuId: v4(),
      active: {
        label: "Login",
        icon: "login",
        value: "login",
        themeId: "",
        name: "login",
        locale: "",
        uid: authItemUid,
        menuItemId: authItemId,
        link: "login",
      },
      alternatives: [
        {
          label: "Login",
          icon: "login",
          name: "login",
          value: "login",
          themeId: "",
          locale: "",
          uid: authItemUid,
          menuItemId: authItemId,
          link: "login",
        },
        {
          label: "Logout",
          icon: "logout",
          name: "logout",
          locale: "",
          themeId: "",
          value: "logout",
          uid: v4(),
          menuItemId: v4(),
          link: "logout",
        },
      ],
    },
  ];
};
