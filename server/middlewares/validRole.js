//write middleware to check the role of the user
exports.validRole = (req, res, next) => {
  const { isAdmin } = req.user;
  if (isAdmin === false) {
    return res.status(401).json({ message: 'You are not admin' });
  }
  next();
};
