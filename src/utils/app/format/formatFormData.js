module.exports = (data) => {
  if (!data) return;
  const canSkip = ["hero", "sectionHero"];
  let pageData = {};
  let refs = {};
  Object.keys(data).forEach((key) => {
    if (!canSkip.includes(key)) {
      // key variables
      const current = key.split("-");
      const name = current[0];
      const group = current[1] || "";
      const sharedKey = current[2] || "";
      const value = data[key];
      // check if data is part of sub doc
      if (sharedKey) {
        if (refs[group]?.length > 0) {
          // check existing grouping
          const sharedKeyIdx = refs[group]?.findIndex((p) => p.sharedKey === sharedKey);
          if (sharedKeyIdx >= 0) {
            // add to grouping
            refs[group][sharedKeyIdx] = { ...refs[group][sharedKeyIdx], [name]: value };
          } else refs[group].push({ [name]: value, sharedKey });
          // create grouping
        } else refs[group] = [{ [name]: value, sharedKey }];
        // add data
      } else pageData[name] = value === "true" ? true : value === "false" ? false : value;
    }
  });
  return { pageData, refs };
};
