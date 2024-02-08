const mongoose = require('mongoose');

const HostingSchema = new mongoose.Schema(
  {
    // web hosting lote yin coin a little pay ya mal hehe, arr drr mha player tway ka yaw support tip pay mhar
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    domain: {
      type: String,
      required: true,
      trim: true,
      unique: [true, 'Domain is already used!'],
    },
    description: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    hostingType: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    receievedCoin: {
      type: Number,
      default: 0,
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: undefined,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hosting', HostingSchema);
