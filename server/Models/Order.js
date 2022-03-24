const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OderSchema = new Schema({
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
   ],
   amount:{
       type: Number, required: true
   },
   address: {
       type: Object, required: true
   },
   status: {
    type: String, default: "pending"
},


}, { timestamps: true })

var Order = mongoose.model('Order', OderSchema)
module.exports = Order