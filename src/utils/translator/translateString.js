const translate = require("google-translate-api");
// const { translatorKey } = require("../../../config.env");

module.exports = async (textToTranslate, targetLanguage) => {
  return await translate({ text: textToTranslate, to: targetLanguage }, (err, translation) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Original text: ${textToTranslate}`);
      console.log(`Translated text: ${translation}`);
      return translation;
    }
  });
};
