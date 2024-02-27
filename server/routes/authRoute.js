const router = require('express').Router();
const { protect } = require('../middlewares/protectRoute');

const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutAllDevices,
  verifyEmail,
  isLogined,
} = require('../controllers/authController');

router.route('/register').post(register);
router.route('/verifyemail/:token').post(verifyEmail);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resetToken').patch(resetPassword);
router.route('/changepassword').patch(protect, changePassword);
router.route('/logoutalldevices').get(protect, logoutAllDevices);
const { verifyJWT } = require('./../middlewares/verifyJWT');
router.route('/isLogined').get(verifyJWT, isLogined);

module.exports = router;
