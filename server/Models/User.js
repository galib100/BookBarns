const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const valid =require('validator')
const UserSchema = new Schema({
    username:String,
    email: {
        type:String,
        trim:true,
        },
    password:String,
    isAdmin:{
        type:Boolean,
        default: false

    },
    
},{timestamps: true})

var User = mongoose.model('User',UserSchema)
module.exports = User