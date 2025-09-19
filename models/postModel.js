const { text } = require('express');
const mongoose= require('mongoose');

const postSchema= new mongoose.Schema({
    tittle:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    likes:{
         type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    Comment:{
         type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    text:{
       type: String,
       required: true,
    }
},{timestamps: true});