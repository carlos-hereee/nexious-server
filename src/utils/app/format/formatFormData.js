module.exports = (data) => {
  if (!data) return;
  let pageData = {};
  const keys = Object.keys(data);
  const refs = {};
  keys.forEach((key) => {
    // key variables
    const current = key.split("-");
    const name = current[0];
    const group = current[1] || "";
    const sharedKey = current[2] || "";
    const value = data[key];
    if (sharedKey) {
      // integrate common keys to
      if (refs[group]) {
        const sharedKeyIdx = refs[group].findIndex((p) => p.sharedKey === sharedKey);
        refs[group][sharedKeyIdx] = { ...refs[group][sharedKeyIdx], [name]: value };
      } else refs[group] = [{ [name]: value, sharedKey }];
    } else pageData[name] = value === "true" ? true : value === "false" ? false : value;
  });
  return { pageData, refs };
};
