const express= require('express');
const router=express.Router();

const authRoute=require('../routes/authRoute.js');
const postRoute= require('../routes/postRoute.js');

router.use('/user', authRoute);
router.use('/post', postRoute);

module.exports=router;

