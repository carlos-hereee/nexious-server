export const regexPatern = {
  localPathIncludeJson: `from (?!.jsonwebtoken)(.*\.json)`,
  localPathExcludeJson: `from (?!.*json)(.*)/`,
  localPath: `(.*)/`,
};
