export const userRoute: RequestHandler = (req, res) => {
  res.status(200).json(req.user).end();
};
