const multer = require('multer');
const CustomError = require('../utils/CustomError');
const path = require('path');
const fs = require('fs');

const storage = (customPath, manualPath, useOriginalName) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const userFilePath = req.user?.filePat || 'allFiles';
      const dest = path.resolve(
        __dirname,
        '..',
        'uploads',
        customPath,
        userFilePath,
        manualPath ? manualPath : ''
      );
      console.log(dest);
      if (!fs.existsSync(dest)) {
        // Create folder if it doesn't exist
        fs.mkdirSync(dest, { recursive: true });
      }
      cb(null, dest);
    },
    filename: (req, file, cb) => {
      if (useOriginalName) {
        const originalName = file.originalname;
        const uniqueFilename = `${originalName}`;
        req.uniqueFilename = uniqueFilename;
        console.log(req.uniqueFilename);
        return cb(null, uniqueFilename);
      } else {
        const timestamp = Date.now();
        const originalName = file.originalname;
        const extension = originalName.substring(originalName.lastIndexOf('.'));
        const uniqueFilename = `${timestamp}-${originalName}`;
        req.uniqueFilename = uniqueFilename;
        console.log(req.uniqueFilename);
        cb(null, uniqueFilename);
      }
    },
  });
};

const limits = (req) => {
  const nonPremiumMB = process.env.NON_PREMIUM_MB || 20;
  const premiumMB = process.env.PREMIUM_MB || 2048;
  const isPremiumUser = req?.user?.isPremium || false;
  const fileSizeLimit = isPremiumUser ? premiumMB : nonPremiumMB;
  return { fileSize: fileSizeLimit * 1024 * 1024 };
};
const upload = (customPath, manualPath, useOriginalName, req) =>
  multer({
    storage: storage(customPath, manualPath, useOriginalName),
    // fileFilter,
    limits: limits(req),
  });

const errorChecker = (err, next) => {
  if (err) {
    console.error('Error during file upload:');

    if (err instanceof multer.MulterError) {
      let errorMessage;

      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          errorMessage = 'File size too large.';
          break;
        case 'LIMIT_UNEXPECTED_FILE':
          errorMessage = 'Too many files to upload.';
          break;
        default:
          errorMessage = 'An error occurred during file upload.';
          break;
      }

      const customError = new CustomError(errorMessage, 400);
      next(customError); // Change this line to next(err);
    } else {
      const customError = new CustomError(
        'An error occurred during file upload.',
        500
      );
      next(customError); // Change this line to next(err);
    }
  }
};

exports.multiUpload =
  (customPath, manualPath, useOriginalName = false) =>
  (req, res, next) => {
    upload(customPath, manualPath, useOriginalName, req).array('files', 12)(
      req,
      res,
      (err) => {
        // customPath for the main folder and, manualPath for the subfolder
        errorChecker(err, next);
      }
    );
  };

exports.singleUpload =
  (customPath, manualPath, useOriginalName = false) =>
  (req, res, next) => {
    upload(customPath, manualPath, useOriginalName, req).single('file')(
      req,
      res,
      (err) => {
        if (err) errorChecker(err, next);
        else next();
      }
    );
  };
