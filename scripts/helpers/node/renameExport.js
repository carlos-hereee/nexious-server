module.exports = (str, fileName) => {
  if (typeof str === "string") {
    const componentName = fileName.split(".ts")[0];
    console.log("made chagnes to :>> ", fileName);
    return str.replace("export", `export const ${componentName}`);
  }
};
