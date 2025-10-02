const express= require('express');
const router= express.Router();
const {auth}= require('../middlewares/verifyToken.js');

const {createComment, getComment, updateComment, deleteComment }= require('../controllers/commentController.js');

router.post('/create',auth, createComment);
// router.get('/getById/:id',auth, getComment);
// router.put('/update/:id',auth, updateComment);
// router.delete('/delete/:id',auth, deleteComment);

module.exports= router;

