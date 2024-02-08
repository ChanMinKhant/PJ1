const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');
const util = require('util');
const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const jwt = require('jsonwebtoken');
//i am not sure it is good or not/ for refresh token or access token
exports.protect = asyncErrorHandler(async (req, res, next) => {
  //Read the token and check if it exists
  const token = req?.cookies?.jwt;
  // const authHeader = req.headers.authorization;
  // let token;
  // if (authHeader && authHeader.startsWith('Bearer')) {
  //   token = authHeader.split(' ')[1];
  // }
  if (!token) {
    return next(new CustomError('You are not logged in', 401));
  }
  //valitate the tokenken
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.TOKEN_SECRET
  );

  //token is exist in db?  and check the valid user
  const tokenInDb = await Token.findOne({ token });

  if (tokenInDb && tokenInDb.user_id.toString() !== decoded.id) {
    res.clearCookie('jwt');
    return next(new CustomError('User not found', 401));
  }

  //if the user exits
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new CustomError('The user does not exist', 401));
  }

  //if the user changed password after the token was issued
  // i will check it for refresh token

  // if (user.isPasswordChanged(decoded.iat)) {
  //   return next(
  //     new customError(
  //       'the password has been changed recently. Please log in again',
  //       401
  //     )
  //   );
  // }
  req.user = user;
  //Allow user to access the route
  next();
});
