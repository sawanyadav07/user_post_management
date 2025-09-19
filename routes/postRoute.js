const express= require('express');
const router= express.Router();

const {createPost, getPost, updatePost, deletePost }= require('../controllers/postController.js');

router.post('/create', createPost);
router.get('/create', getPost);
router.put('/create', updatePost);
router.delete('/create', deletePost);

module.exports= router;

