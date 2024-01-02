export = (pageName) => {
  return {
    category: "page",
    isPage: true,
    name: pageName,
    value: pageName,
    link: `/${pageName}`,
    label: pageName,
  };
};
