const router = require('express').Router();

const { protect } = require('../middlewares/protectRoute');
const { validRole } = require('../middlewares/validRole');
const {
  sendStudentEmail,
  createStudent,
  uploadFile,
  sendInfomation,
} = require('../controllers/sendInfoController');

router.route('/').post(protect, validRole, sendStudentEmail);
router.route('/student').post(protect, validRole, createStudent);
router.route('/upload').post(protect, validRole, uploadFile);
router.route('/send').post(protect, validRole, sendInfomation);

module.exports = router;
