const router = require('express').Router();
const { handleRefreshToken } = require('../controllers/refreshTokenController');

router.route('/').post(handleRefreshToken);

module.exports = router;
