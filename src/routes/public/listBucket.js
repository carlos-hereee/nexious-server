const { allBuckets } = require("../../utils/aws/index");

module.exports = async () => {
  try {
    const data = await allBuckets();
    console.log("data :>> ", data);
  } catch (error) {}
};
