const router = require('express').Router();
const { protect } = require('../middlewares/protectRoute');
const { verifyJWT } = require('../middlewares/verifyJWT');
const {
  createShortenUrl,
  getAllUrls,
  getUrl,
  deleteUrl,
  updateUrl,
} = require('../controllers/urlShortenController');

router.route('/').post(verifyJWT, createShortenUrl).get(verifyJWT, getAllUrls);

router
  .route('/:shortUrl')
  .post(getUrl)
  .delete(protect, deleteUrl)
  .patch(protect, updateUrl);
module.exports = router;

/*
i can do two things here
1. i can use each route for url and file /url/:id and /file/:id
2. i can use one route for both /:id and check if it is url or file
here i am using second option
i will add u for url and f for file in front of id
*/
