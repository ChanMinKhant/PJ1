require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const { dbConnect } = require('../config/dbConnect');
const fs = require('fs');
console.log(process.env.MONGO_URI);
//backup from mongodb

dbConnect();

const User = require('../models/userModel');
const Url = require('../models/urlModel');
const File = require('../models/fileModel');
const RefreshToken = require('../models/refreshTokenModel');

const backupData = async () => {
  try {
    const users = await User.find();
    const urls = await Url.find();
    const files = await File.find();
    const refreshTokens = await RefreshToken.find();

    if (users) {
      fs.writeFileSync(
        `${__dirname}/backupData/users.json`,
        JSON.stringify(users)
      );
    }
    if (urls) {
      fs.writeFileSync(
        `${__dirname}/backupData/urls.json`,
        JSON.stringify(urls)
      );
    }
    if (files) {
      fs.writeFileSync(
        `${__dirname}/backupData/files.json`,
        JSON.stringify(files)
      );
    }
    if (refreshTokens) {
      fs.writeFileSync(
        `${__dirname}/backupData/refreshTokens.json`,
        JSON.stringify(refreshTokens)
      );
    }

    console.log('Data successfully backed up');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--b') {
  backupData();
}
