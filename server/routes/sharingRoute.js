const router = require('express').Router();

const { protect } = require('../middlewares/protectRoute');

const { sendStudentEmail } = require('../controllers/sendInfoController');

router.route('/').post(protect, sendStudentEmail);

module.exports = router;
