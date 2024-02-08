const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  shortId: {
    //localhost:3000/file/qwer
    type: String,
    unique: [true, 'Something went wrong! try again'],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: undefined,
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
  downloadCount: {
    type: Number,
    default: 0,
  },
  filename: {
    type: String,
  },
  originalFilename: {
    type: String,
  },
  fileSize: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('File', FileSchema);
