module.exports = async (req, res) => {
  res.status(200).json(req.user).end();
};
