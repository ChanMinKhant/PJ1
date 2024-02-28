const refreshTokenModel = require('../models/refreshTokenModel');
const jwt = require('jsonwebtoken');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

exports.handleRefreshToken = asyncErrorHandler(async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  if (!refreshToken) return res.sendStatus(401);
  const foundUser = await refreshTokenModel.findOne({ token: refreshToken });
  if (!foundUser) {
    //i will delete cookie if doesnt found. even they exist
    res.clearCookie('jwt');
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.user_id.toString() !== decoded.id)
      return res.sendStatus(403); //forbidden
    const accessToken = jwt.sign(
      { id: foundUser.user_id.toString() },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '30s' }
    );
    // res.cookie('jwt_acc', accessToken, { httpOnly: true, maxAge: 900000 });
    res.status(200).json({ accessToken });
  });
});
