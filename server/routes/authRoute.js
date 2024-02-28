const router = require('express').Router();
const { protect } = require('../middlewares/protectRoute');
const { verifyJWT } = require('./../middlewares/verifyJWT');
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
  tempPreminum,
  tempAdmin,
} = require('../controllers/authController');

router.route('/register').post(verifyJWT, register);
router.route('/verifyemail/:token').post(verifyEmail);
router.route('/login').post(verifyJWT, login);
router.route('/logout').get(logout);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resetToken').patch(resetPassword);
router.route('/changepassword').patch(protect, changePassword);
router.route('/logoutalldevices').get(protect, logoutAllDevices);
router.route('/isLogined').get(verifyJWT, isLogined);
router.route('/adm').get(protect, tempAdmin);
router.route('/pre').post(protect, tempPreminum);

module.exports = router;
