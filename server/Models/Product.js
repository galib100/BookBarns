const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    writter: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },


}, { timestamps: true })

var Product = mongoose.model('Product', ProductSchema)
module.exports = Product