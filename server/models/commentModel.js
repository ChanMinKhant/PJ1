const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: [true, 'Please enter a comment'],
      trim: true,
      minlength: 3,
    },
    hosting_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hosting',
      default: undefined,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
