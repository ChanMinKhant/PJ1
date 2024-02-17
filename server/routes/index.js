const router = require('express').Router();
const authRoute = require('./authRoute');
const urlRoute = require('./urlRoute');
const fileRoute = require('./fileRoute');
const hostRoute = require('./hostRoute');
const sharingRoute = require('./sharingRoute');

router.use('/auth', authRoute);
router.use('/url', urlRoute);
router.use('/file', fileRoute);
router.use('/host', hostRoute);
router.use('/sharing', sharingRoute);

module.exports = router;
