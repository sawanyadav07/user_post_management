const express = require('express');
const router = express.Router();

const authRoute = require('../routes/authRoute.js');
const postRoute = require('../routes/postRoute.js');
const commentRoute = require('../routes/commentRoute.js');
const likeRoute = require('../routes/likeRoute.js');

router.use('/user', authRoute);
router.use('/post', postRoute);
router.use('/comment', commentRoute);
router.use('/like', likeRoute);

module.exports = router;

