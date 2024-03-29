const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    userId: {
        type: String, required: true
    },
   products:[
       {
           productId:{
               type:String
           },
           quantity:{
               type:Number,
               default:1
           },
       },
   ]


}, { timestamps: true })

var Cart = mongoose.model('Cart', CartSchema)
module.exports = Cart