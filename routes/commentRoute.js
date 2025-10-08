const express= require('express');
const router= express.Router();
const {auth}= require('../middlewares/verifyToken.js');

const {createComment, getCommentById, getCommentsByPostId, updateComment, deleteComment }= require('../controllers/commentController.js');

router.post('/create',auth, createComment);
router.get('/getById',auth, getCommentById);
router.get('/getByPost', auth, getCommentsByPostId);
router.put('/update/:id',auth, updateComment);
router.delete('/delete', auth, deleteComment);


module.exports= router;

