// const getHero = require("../../db/models/hero/getHero");
// const useGenericErrors = require("../../utils/auth/useGenericErrors");

// module.exports = async (req, res) => {
//   try {
//     // const filePath = path.resolve() + `/public/${req.params.assetId}`;
//     // set propper content type else drowser will download file
//     // res.setHeader("Content-Type", "image/svg+xml");
//     // res.sendFile(filePath);
//     const bucketName = req.params.bucketName;
//     const filename = req.params.assetId;
//     console.log("fileName :>> ", filename);
//     const hero = await getHero({ filename });
//     res.status(200).send(hero).end();
//   } catch (error) {
//     useGenericErrors(res, error, "unable to get asset data");
//   }
// };
