const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../Models/UserModel')
const { json } = require('body-parser')
const { set } = require('mongoose')



const nameCont = (req, res) => {
    res.send('my name is galib');
}


const postSignupController = (req, res) => {
    var errMsg = "";
    req.body.password != req.body.password1 ? errMsg = "Password must be same " : errMsg = "pass matching ok"
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err && errMsg.length > 1) {
            console.log(err)
            console.log(errMsg)
            res.send(errMsg);

        } else {

            let user = new User({
                name: req.body.name,
                email: req.body.email,
                number: req.body.number,
                password: hash,
                password1: hash
            });


            try {
                const savedUser = user.save();
                console.log(savedUser);
                res.send(savedUser);
            } catch (error) {
                res.status(400).send(error)
            }
        }



    })
}


module.exports = {
    nameCont, postSignupController

}