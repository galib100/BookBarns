const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../Models/User')
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


//Post_login Controller
const postLoginController = (req,res)=>{
    let password = req.body.password;
    let email = req.body.email;
   
    User.findOne({email})
    .then(user =>{
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    res.json({
                        msg: "password doesn't match"
                    })
                }
                if(result){
                    console.log("Login successfully")
                    res.json({
                        msg: "user find here",
                        user: result
                    })
                }
            })

        }
        else{
           res.json({
               msg: "Donar can't find here"
           })
        }
    })
}

module.exports = {
    nameCont, postSignupController,postLoginController

}