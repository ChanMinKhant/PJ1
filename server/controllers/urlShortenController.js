//import from urlModel
const Url = require('../models/urlModel');
const CustomError = require('../utils/CustomError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const generateRandomString = require('./../helper/generateRandomString');
const User = require('../models/userModel');
const ApiFeactures = require('../utils/ApiFeactures');

exports.createShortenUrl = asyncErrorHandler(async (req, res, next) => {
  const {
    url,
    customLink,
    password = undefined,
    limit,
    isActive = true,
  } = req.body;
  if (
    !url ||
    !(
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('www')
    )
  ) {
    const err = new CustomError('Please enter a valid url', 400);
    return next(err);
  }
  // check password contain or not

  if (customLink) {
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
      const isExist = await Url.findOne({ shortUrl: customLink });
      // console.log(isExist?._id.toString());
      if (isExist) {
        const err = new CustomError('link already exist!', 400);
        return next(err);
      }
    }
    //check password contain or not and length
  }

  if (password) {
    if (password.length < 3) {
      const err = new CustomError('Password must be atleast 3 characters', 400);
      return next(err);
    }
  }

  if (limit && limit < 0) {
    return next(new CustomError('limit must be greater than 0', 400));
  }

  const shortUrl = generateRandomString(process.env.URL_LENGTH);
  // const user = req.user ? req.user._id : null; // or undefined
  const user_id = req.user?._id;

  const newUrl = await Url.create({
    url,
    shortUrl: customLink || shortUrl,
    user_id,
    password,
    limit: limit || 1000,
    isActive,
  });
  // const shortenedUrl = `${req.protocol}://${req.get('host')}/url/${shortUrl}`;
  // console.log(shortenedUrl);
  res.status(201).json({
    status: 'success',
    data: newUrl,
    // shortenedUrl,
  });
});

// i have to solve if i wont use customLink and if use add customLink i will store also in shortUrl
exports.getAllUrls = asyncErrorHandler(async (req, res, next) => {
  if (!req.user) {
    const err = new CustomError(
      'only login user can see the generated url',
      400,
    );
    return next(err);
  }
  const user_id = req.user?._id;
  const apiFeactures = new ApiFeactures(Url.find({ user_id }), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const urls = await apiFeactures.query;
  res.status(200).json({
    status: 'success',
    isPremium: req.user?.isPremium,
    data: urls,
  });
});

// exports.getUrl = asyncErrorHandler(async (req, res, next) => {
//   const { shortUrl } = req.params;
//   let url = await Url.findOne({ shortUrl });
//   if (!url) {
//     url = await Url.findOne({ customLink: shortUrl });
//   }

//   if (!url) {
//     const err = new CustomError('url not found', 404);
//     return next(err);
//   }
//   //how can i do if password id exist or not and if exist i will shoe password page
//   //if not exist i will redirect to url

// });

exports.getUrl = asyncErrorHandler(async (req, res, next) => {
  //user can request with password or not
  const { shortUrl } = req.params;
  const { password } = req.body;

  const url = await Url.findOne({ shortUrl });
  // if (!url) {
  //   url = await Url.findOne({ customLink: shortUrl });
  // }
  if (!url) {
    const err = new CustomError('url not found', 404);
    return next(err);
  }

  if (!url?.isActive) {
    const err = new CustomError('This short url is not active', 400);
    return next(err);
  }

  if (url.limit <= 0) {
    const err = new CustomError('This short url already expired', 400);
    return next(err);
  }

  if (url.password) {
    //if url contain password, need to render password page
    if (!password) {
      const err = new CustomError('Password required', 400);
      return next(err);
    } // i think it is not necessary
    if (url.password !== password) {
      const err = new CustomError('Password is incorrect', 400);
      return next(err);
    }
  }
  let redirectUrl = url.url;
  if (
    !redirectUrl.startsWith('http://') &&
    !redirectUrl.startsWith('https://')
  ) {
    redirectUrl = 'http://' + redirectUrl;
  }
  // res.redirect(redirectUrl);
  url.clickCount++;
  url.limit--;
  await url.save({ validateBeforeSave: false });
  res.status(200).json({
    status: true,
    redirectUrl,
  });
});

exports.deleteUrl = asyncErrorHandler(async (req, res, next) => {
  //find obj_id or shortUrl. i will do something
  // const user = await User.findById({});
  const { shortUrl } = req.params;
  const url = await Url.findOne({ shortUrl });
  if (!url) {
    const err = new CustomError('url not found', 400);
    return next(err);
  }
  console.log(req.user);
  if (req.user?.id.toString() !== url.user_id.toString()) {
    const err = new CustomError('You can delete only your own url', 400);
    return next(err);
  }
  await Url.findByIdAndDelete(url.id);
  if (!url) {
    const err = new CustomError('url not found', 404);
    return next(err);
  }
  res.status(204).json({ status: 'success', message: 'url deleted' });
});

exports.updateUrl = asyncErrorHandler(async (req, res, next) => {
  // req.user = user; //for testing
  const { shortUrl } = req.params;
  const { url, customLink, password, isActive } = req.body;
  console.log(req.body);
  const foundUrl = await Url.findOne({ shortUrl });
  if (!foundUrl) {
    const err = new CustomError('URL not found', 404);
    return next(err);
  }

  // console.log(foundUrl);

  if (req.user?.id !== foundUrl.user_id.toString()) {
    const err = new CustomError('You can update only your own url', 400);
    return next(err);
  }

  // Build an object with the properties that are present in req.body
  const updateFields = {};
  if (url) updateFields.url = url;

  if (customLink || password) {
    if (!req.user?.isPremium) {
      const err = new CustomError(
        'this feature is only available for premium users',
        400,
      );
      return next(err);
    }
    if (customLink) updateFields.shortUrl = customLink;
    if (password) updateFields.password = password;
  }

  if (isActive) updateFields.isActive = isActive;

  // Use findOneAndUpdate to update the document
  const updatedUrl = await Url.findOneAndUpdate(
    { shortUrl },
    { $set: updateFields },
    { new: true }, // To return the updated document
  );

  // Check if the URL was found and updated
  if (!updatedUrl) {
    const err = new CustomError('URL not found', 404);
    return next(err);
  }

  // Send the updated URL as the response
  res.json(updatedUrl);
});
