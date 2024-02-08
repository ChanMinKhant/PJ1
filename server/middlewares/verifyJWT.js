const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const mongoose = require('mongoose');
const Token = require('../models/tokenModel');

exports.verifyJWT = asyncErrorHandler(async (req, res, next) => {
  const token = req?.cookies?.jwt; // cookies.jwt // iam not sure cookie or authrization
  // const authHeader = req.headers['authorization'];
  // if (!authHeader) return next();
  // const token = authHeader.split(' ')[1];
  if (!token) return next();
  const tokenFromDb = await Token.findOne({ token });
  if (!tokenFromDb) return next();
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err || tokenFromDb.user_id.toString() !== decoded.id) return next();
      req.userId = decoded.id;
      const user = await User.findById(decoded.id);
      if (!user) next();
      req.user = user;
      next();
    });
  } catch (error) {
    next();
  }
});

// const verifyJWT = async (req, res, next) => {
//   const authHeader = req.headers['authorization'];

//   if (!authHeader) return next();

//   const token = authHeader.split(' ')[1];

//   if (!token) return next();

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
//     if (err) {
//       // Handle the error appropriately, e.g., log it or send an error response
//       console.error(err);
//       return next();
//     }

//     console.log(decoded);
//     req.userId = decoded.id;

//     if (!req.userId) return next();

//     try {
//       const user = await User.findById(req.userId);

//       if (!user) return next();

//       req.user = user;
//       next();
//     } catch (error) {
//       // Handle the error appropriately
//       console.error(error);
//       return next();
//     }
//   });
// };

// module.exports = verifyJWT;
