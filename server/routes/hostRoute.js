const router = require('express').Router();
const { suspendHost } = require('../controllers/hostController');
const { verifyJWT } = require('../middlewares/verifyJWT');
const {
  createHost,
  getHost,
  getHosts,
} = require('../controllers/hostController');
const { protect } = require('../middlewares/protectRoute');

router.route('/').post(protect, createHost).get(protect, getHosts);
router.route('/suspend/:domain').get(getHost).delete(protect, suspendHost);

module.exports = router;
