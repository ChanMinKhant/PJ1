const { request } = require('http');
const File = require('../models/FileModel.js');
const CustomError = require('../utils/CustomError.js');
const asyncErrorHandler = require('../utils/asyncErrorHandler.js');
const generateRandomString = require('../helper/generateRandomString.js');
const path = require('path');
const fs = require('fs').promises;

// Upload File @ POST /file/upload
exports.uploadFile = asyncErrorHandler(async (req, res, next) => {
  console.log(req.file);
  const { customLink, password, limit, customFileName } = req.body;
  const user_id = req.user?._id || undefined;
  const originalFilename = customFileName
    ? `${customFileName}${path.extname(req.file?.originalname)}`
    : req.file?.originalname;
  console.log(req.file);
  if (!originalFilename) {
    const err = new CustomError('you cannot upload without file name', 400);
    return next(err);
  }
  const filename = req.uniqueFilename;
  const fileSize = req.file?.size || 0;
  if (customLink || password || limit) {
    if (!req.user?.isPremium) {
      const err = new CustomError(
        'these feactures are only available for premium users',
        400,
      );
      return next(err);
    }
    if (customLink) {
      //chech length of customLink
      if (customLink.length < 3) {
        const err = new CustomError(
          'Custom link must be atleast 3 characters',
          400,
        );
        return next(err);
      }
      //check if customLink already exist?
      const isExist = await File.findOne({ shortId: customLink });
      if (isExist) {
        const err = new CustomError('link already exist!', 400);
        return next(err);
      }
    }
    //check password contain or not and length
    if (password) {
      if (password.length < 3) {
        const err = new CustomError(
          'Password must be atleast 3 characters',
          400,
        );
        return next(err);
      }
    }
  }
  // const file = {
  //   shortId: customLink || generateRandomString(),
  //   originalFilename,
  //   filename,
  //   user_id,
  //   fileSize,
  //   password: password || undefined,
  //   limit: limit || undefined,
  // };
  // Save file to the database
  const file = await File.create({
    shortId: customLink || generateRandomString(),
    originalFilename,
    filename,
    user_id,
    fileSize,
    password: password || undefined,
    limit: limit || undefined,
  });
  res.status(200).json({ message: 'File uploaded successfully.', data: file });
});

// Get File @ GET /file/:id
exports.getFile = asyncErrorHandler(async (req, res, next) => {
  const { shortId } = req.params;
  const { password } = req.body;

  // search file in database
  const file = await File.findOne({ shortId }).populate('user_id', 'filePath');
  if (!file) {
    const err = new CustomError('File not found', 404);
    return next(err);
  }

  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${encodeURIComponent(file.originalFilename)}"`,
  );
  //check if file is active or not
  if (!file.isActive) {
    console.log(file.isActive);
    const err = new CustomError('File is not active', 400);
    return next(err);
  }
  //check if the file limit is over or not
  if (file.limit) {
    if (file.limit <= 0) {
      const err = new CustomError('File limit is over', 400);
      return next(err);
    }
  }
  //check if file is password protected or not
  if (file.password) {
    if (!req.body.password) {
      const err = new CustomError('Password is required', 400);
      return next(err);
    }
    if (req.body.password !== file.password) {
      const err = new CustomError('Password is incorrect', 400);
      return next(err);
    }
  }
  // i need to know the uploader of the file so that i can check the path of the file
  const filePath = path.join(
    __dirname,
    '..',
    'uploads',
    'file',
    file.user_id || 'allfiles',
    file.filename,
  );

  const filename = file.originalFilename;
  console.log(filename);
  res.download(filePath, file.originalFilename, async (err) => {
    if (err) {
      const error = new CustomError('File not found', 404);
      return next(error);
    }
  });
});

exports.getOriginalFilename = asyncErrorHandler(async (req, res, next) => {
  const { shortId } = req.params;
  console.log(shortId);
  const file = await File.findOne({ shortId });
  if (!file) {
    const err = new CustomError('File not found', 404);
    return next(err);
  }
  res.status(200).json({ message: 'success', data: file.originalFilename });
});

// Get All Files @ GET /file
exports.getAllFiles = asyncErrorHandler(async (req, res, next) => {
  if (!req.user) {
    const err = new CustomError(
      'only login user can see the uploaded file',
      400,
    );
    return next(err);
  }
  const files = await File.find({ user_id: req.user?._id });
  res.status(200).json({
    status: 'success',
    data: files,
  });
});

//update file @ BATCH /file/:id
exports.updateFile = asyncErrorHandler(async (req, res, next) => {
  // req.user = user; //for testing
  const { shortId } = req.params;
  const {
    filename = undefined,
    customLink = undefined,
    password = undefined,
    isActive = undefined,
  } = req.body;
  const file = await Url.findOne({ shortId });
  if (!file) {
    const err = new CustomError('File not found', 404);
    return next(err);
  }

  if (req.user?._id !== file.user_id.toString()) {
    const err = new CustomError('You can update only your own url', 400);
    return next(err);
  }

  // Build an object with the properties that are present in req.body
  const updateFields = {};
  if (filename) updateFields.url = url;

  if (customLink || password) {
    if (!req.user?.isPremium) {
      const err = new CustomError(
        'this feature is only available for premium users',
        400,
      );
      return next(err);
    }
    if (customLink) updateFields.customLink = customLink;
    if (password) updateFields.password = password;
  }

  if (isActive) updateFields.isActive = isActive;

  // Use findOneAndUpdate to update the document
  const updatedFile = await Url.findOneAndUpdate(
    { shortId },
    { $set: updateFields },
    { new: true }, // To return the updated document
  );

  // Check if the URL was found and updated
  if (!updatedUrl) {
    const err = new CustomError('URL not found', 404);
    return next(err);
  }

  // Send the updated URL as the response
  res.status(200).json({
    status: 'success',
    message: 'File deleted successfully',
    updatedFile,
  });
});

//delete file @ DELETE /file/:id
exports.deleteFile = asyncErrorHandler(async (req, res, next) => {
  const { shortId } = req.params;
  // req.user = user; //for testing
  console.log(shortId);
  const file = await File.findOne({ shortId });
  console.log(req.user);
  console.log(file);
  if (req.user._id.toString() !== file.user_id.toString()) {
    const err = new CustomError('You can delete only your own file', 400);
    return next(err);
  }
  // const url = await Url.findByIdAndDelete(id);
  if (!file) {
    const err = new CustomError('File not found', 404);
    return next(err);
  }
  console.log(
    path.join(__dirname, '..', 'uploads', 'file', 'allFiles', file.filename),
  );
  try {
    await fs.unlink(
      path.join(__dirname, '..', 'uploads', 'file', 'allFiles', file.filename),
    );
  } catch (error) {
    await File.deleteOne({ shortId });
    const err = new CustomError(
      'An error occurred while deleting the file',
      500,
    );
    return next(err);
  }
  await File.deleteOne({ shortId });
  res.status(200).json({
    status: 'success',
    message: 'File deleted successfully',
    data: file,
  });
});

//download file @ GET /file/:id
exports.sendDownloadFile = asyncErrorHandler(async (req, res, next) => {
  const { shortId } = request.params;
  const { password } = req.body;
  const file = await File.findOne({ shortId: shortId });
  if (file.password) {
    if (!password) {
      next(new CustomError('password is required', 401));
    }
    if (file.password !== password) {
      next(new CustomError("password doesn't match", 401));
    }
  }

  const filePath = path.join(
    __dirname,
    '..',
    'uploads',
    'file',
    'allFiles',
    file.filename,
  );
  res.sendFile(filePath);
});
