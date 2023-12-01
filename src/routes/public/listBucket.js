const { allBuckets } = require("../../utils/aws/index");

module.exports = () => {
  const data = allBuckets();
  console.log("data :>> ", data);
};
