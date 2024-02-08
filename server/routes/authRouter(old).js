const router = require('express').Router();
const {
  handleSignup,
  handleLogin,
  handleLogout,
} = require('../controllers/authController.js');
const jwt = require('jsonwebtoken');

router
  .route('/register')
  .post(handleSignup)
  .get((req, res) => {
    res.render('signin');
  });

router
  .route('/login')
  .post(handleLogin)
  .get((req, res) => {
    res.render('loginin');
  });

router.route('/logout').get(handleLogout);

module.exports = router;
