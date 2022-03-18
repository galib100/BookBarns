const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../Models/UserModel')
const { json } = require('body-parser')
const { set } = require('mongoose')



const nameCont = (req,res)=>{
    res.send('my name is galib');
}


const postSignupController = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.log(err)
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            password: hash,
            password1: hash
        })

        user.save()
            .then(result => {
                console.log("register successfully!!")
                console.log(result)
                 
            })
            .catch(err => {
                res.json({
                    err
                })
            })
    })
}


module.exports = {
nameCont,postSignupController

}