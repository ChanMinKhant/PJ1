const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      default: undefined,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: [true, 'Something went wrong! try again'],
      trim: true,
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9-_]+$/.test(value);
        },
        message: 'Link should not contain special characters or spaces',
      },
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      minlength: 3,
      trim: true,
    },
    limit: {
      type: Number,
      default: 1000,
    },
  },
  { timestamps: true }
);

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
