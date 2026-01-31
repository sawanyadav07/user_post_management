const express = require('express');
const router = express.Router();

const authRoute = require('../routes/authRoute.js');
const postRoute = require('../routes/postRoute.js');
const commentRoute = require('../routes/commentRoute.js');
const likeRoute = require('../routes/likeRoute.js');
const notificationRoutes =  require('../routes/notificationRoutes.js');
const followRoutes = require("../routes/followRoute.js");

router.use('/user', authRoute);
router.use('/post', postRoute);
router.use('/comment', commentRoute);
router.use('/like', likeRoute);
router.use('/notification',notificationRoutes)
router.use("/follow", followRoutes);

module.exports = router;



