const mongoose = require('mongoose');
// i store refresh token in database because i want only allow one refresh token per user
// if user login from another device, the old refresh token will be deleted
// and the new refresh token will be stored in database
// even the samae device, the refresh token will be deleted when user logout
// even the same secret key, same pj, cannot access with the valid refresh token from another server
const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '1s' },
  },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
