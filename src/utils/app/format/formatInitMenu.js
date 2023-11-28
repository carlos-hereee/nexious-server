const { v4 } = require("uuid");

module.exports = () => {
  const activeAuth = {
    label: "Login",
    icon: "login",
    value: "login",
    name: "login",
    locale: "",
    uid: v4(),
    menuItemId: v4(),
    link: "login",
  };

  return [
    {
      isToggle: false,
      isPrivate: true,
      uid: v4(),
      menuId: v4(),
      category: "auth",
      active: activeAuth,
      alternatives: [
        { ...activeAuth },
        {
          label: "Logout",
          icon: "logout",
          name: "logout",
          locale: "",
          value: "logout",
          uid: v4(),
          menuItemId: v4(),
          link: "logout",
        },
      ],
    },
  ];
};
