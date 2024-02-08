const User = require('./../models/userModel');
const Token = require('../models/tokenModel');
const bcrypt = require('bcrypt');
const CustomError = require('./../utils/CustomError');
const jwt = require('jsonwebtoken');
const asyncErrorHandler = require('./../utils/asyncErrorHandler');

const signAccessToken = (user_id) => {
  try {
    return jwt.sign({ id: user_id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN || '10d',
    });
  } catch (err) {
    //customerror handler later
    throw new Error(err.message);
  }
};

function createAccessToken(user_id, accessTokenToken) {
  Token.create({
    token: accessToken,
    user_id,
    expiresAt: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * parseInt(process.env.EXPIRES_IN)
    ),
  });
}

//test async handler
exports.handleSignup = asyncErrorHandler(async (req, res, next) => {
  //if cookie exists, cant signup
  if (req.cookies?.jwt) {
    const err = new CustomError('You are already logged in', 400);
    return next(err);
  }
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  const accessToken = signAccessToken(user._id);
  res.cookie('jwt', accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * parseInt(process.env.EXPIRES_IN || 2),
  });
  createAccessToken(user._id, accessToken);
  res.status(201).json({
    status: 'success',
    user,
    message: 'User created successfully',
    accessToken,
  });
});

// Login @ POST / Public
exports.handleLogin = asyncErrorHandler(async (req, res, next) => {
  //if cookie exists, cant login
  if (req.cookies?.jwt) {
    const err = new CustomError('You are already logged in', 400);
    return next(err);
  }
  const { email, password } = req.body;

  if (!email) {
    const err = new CustomError('Please provide email', 400);
    return next(err);
  }
  if (!password) {
    const err = new CustomError('Please provide password', 400);
    return next(err);
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    //custom error handler later
    return res.status(404).json({
      status: 'fail',
      message: 'User not found! Please sigup',
    });
  }

  if (!(await user.comparePassword(password, user.password))) {
    //custom error handler later
    const err = new CustomError('Incorrect password', 401);
    return next(err);
  }

  const accessToken = signAccessToken(user.id);
  res.cookie('jwt', accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  createAccessToken(user._id, accessToken);
  res.status(200).json({
    status: 'success',
    accessToken,
    message: 'User logged in successfully',
  });
});

exports.handleLogout = asyncErrorHandler(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204); //no content
  const accessToken = cookie.jwt;
  const foundUser = await Token.findOne({ token: accessToken });
  if (!foundUser) {
    return res.sendStatus(401); //unauthorized
  }

  //delete refresh token from db
  await Token.findOneAndDelete({ token: accessToken });
  //clear cookie
  res.clearCookie('jwt');
  res.sendStatus(204); //no content
});

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError('Please provide email', 400);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError('User does not exist! please signup ', 404);
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    message: 'Reset token sent to email',
    resetToken,
  });
});
