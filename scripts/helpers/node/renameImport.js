module.exports = (str) => {
  if (typeof str === "string") {
    return str.replace("const", "import").replace("= require(", " from ").replace(")", "");
  }
};
