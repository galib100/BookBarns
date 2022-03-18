const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const valid =require('validator')
const userSchema = new Schema({
    name:String,
    email: {
        type:String,
        trim:true,
        unique:true,
        validate:{
            validator:(v)=>{
                return valid.isEmail(v)
            },
            message:`{VALUE} isn't valid email`
        }

    },
    password:String,
    password1:String, 
    number:String,
    
})
var User = mongoose.model('User',userSchema)
module.exports = User