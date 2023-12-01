const listBucket = require("../../utils/aws/index");

module.exports = () => {
  const data = listBucket();
  console.log("data :>> ", data);
};
