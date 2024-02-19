const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const generateRandomString = require('../helper/generateRandomString');

// {
//   "username": "tester",
//   "email": "yer@dfd.fdf",
//   "password": "12345678",
//   "confirmPassword": "12345678"
// }

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, 'Username already exists'],
      required: [true, 'Please enter a username'],
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      trim: true,
      lowercase: true,
      validate: [
        {
          validator: function (email) {
            return email.endsWith('@ucspyay.edu.mm');
          },
          message: 'Please enter a valid UCSPYAY email address',
        },
        {
          validator: function (email) {
            return !/\s/.test(email);
          },
          message: 'Email address should not contain spaces',
        },
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      trim: true,
      minlength: 8,
      select: false,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    byteCoin: {
      type: String,
      default: 0,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    totalStorage: {
      type: Number,
      default: 0,
    },
    usedStorage: {
      type: Number,
      default: 0,
    },
    filePath: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpiresAt: Date,
  },
  { timestamps: true }
);

// userSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);

//     if (!this.filePath) {
//       this.filePath = generateRandomString(8);
//     }
//     next();
//   } catch (err) {
//     throw new Error(err.message);
//   }
// });

// userSchema.methods.comparePassword = async function (userPassword, dbPassword) {
//   try {
//     return await bcrypt.compare(userPassword, dbPassword);
//   } catch (err) {
//     throw new Error(err.msg);
//   }
// };

// userSchema.methods.isPasswordChanged = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );
//     return JWTTimestamp < changedTimestamp;
//   }
//   return false;
// };

// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = generateRandomString(32);
//   this.passwordResetToken = resetToken;
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10 minutes
//   return resetToken;
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;

userSchema.pre('save', async function (next) {
  try {
    if (!this.filePath) this.filePath = generateRandomString(16);
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    throw new Error(err.message);
  }
});

userSchema.methods.comparePassword = async function (userPassword, dbPassword) {
  try {
    return await bcrypt.compare(userPassword, dbPassword);
  } catch (err) {
    throw new Error(err.msg);
  }
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000; //10 minutes
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
