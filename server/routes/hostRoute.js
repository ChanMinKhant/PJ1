const router = require('express').Router();
const { suspendHost } = require('../controllers/hostController');
const { verifyJWT } = require('../middlewares/verifyJWT');
const {
  createHost,
  getHost,
  getHosts,
} = require('../controllers/hostController');
const { protect } = require('../middlewares/protectRoute');

router.use(protect);
router.route('/').post(createHost).get(getHosts);
router.route('/:domain').get(getHost).delete(suspendHost);

module.exports = router;
