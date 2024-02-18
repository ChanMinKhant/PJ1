const router = require('express').Router();
const { suspendHost } = require('../controllers/hostController');
const { verifyJWT } = require('../middlewares/verifyJWT');
const {
  createHost,
  getHosts,
  isValidHost,
} = require('../controllers/hostController');
const { protect } = require('../middlewares/protectRoute');

router.route('/').post(protect, createHost).get(protect, getHosts);
router.route('/:subdomain').get(isValidHost);
router.route('/suspend/:domain').delete(protect, suspendHost);

module.exports = router;
