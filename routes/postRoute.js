const express= require('express');
const router= express.Router();
const {auth}= require('../middlewares/verifyToken.js');

const {createPost, getPost, updatePost, deletePost }= require('../controllers/postController.js');

router.post('/create',auth, createPost);
router.get('/getById/:id',auth, getPost);
router.put('/update/:id',auth, updatePost);
router.delete('/delete/:id',auth, deletePost);

module.exports= router;

