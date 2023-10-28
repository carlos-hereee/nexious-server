module.exports = (req, res) => {
  res.status(202).json(req.calendar);
};
