const router = require('express').Router();

const { protect } = require('../middlewares/protectRoute');
const { validRole } = require('../middlewares/validRole');
const {
  sendExamResult,
  createStudent,
  uploadFile,
  sendInfomation,
  deleteStudent,
  getStudents,
  updateStudent,
} = require('../controllers/sendInfoController');

router.route('/').post(protect, validRole, sendExamResult);
router.route('/student').post(protect, validRole, createStudent);
router.route('/upload').post(protect, validRole, uploadFile);
router.route('/sendInfo').post(protect, validRole, sendInfomation);
router.route('/send').post(protect, validRole, sendExamResult);
router.route('/students').post(protect, validRole, getStudents);
router.route('/students/:id').put(protect, validRole, updateStudent);
router.route('/students/:id').delete(protect, validRole, deleteStudent);

module.exports = router;
