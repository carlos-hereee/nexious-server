const saveHero = require("../../db/models/hero/saveHero");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const uploadSingle = require("../../utils/multer/uploadSingle");

module.exports = async (req, res, next) => {
  try {
    // console.log("req.body", req.body);
    // uploadSingle()
    // key variables
    // const { path, fieldname, filename } = req.file;
    // req.hero = {
    //   ...req.file,
    //   heroId: filename,
    //   url: path,
    //   name: fieldname,
    //   userId: req.user ? req.user.userId : "",
    // };
    // await saveHero(req.hero);
    next();
  } catch (error) {
    useGenericErrors(res, error);
  }

  // console.log("req.file", req.file);
  // console.log("req.file", heroId);
};
