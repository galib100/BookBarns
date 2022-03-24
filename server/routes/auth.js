const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const CryptoJS = require("crypto-js"); 
const jwt = require('jsonwebtoken')
//Register
//routes: localhost://5000/api/auth/register
router.post("/register", async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, 'galib').toString(),
    });
    try {
        const savedUser = await newUser.save();
        // console.log(savedUser);
        res.status(201).json(savedUser)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

})


//Login
//api/auth/login
router.post("/login", async (req, res) => {
    
    try {
        const user = await User.findOne({username: req.body.username})
         !user && res.status(401).json("wrong credentials !!! no user found")
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            'galib'
        )
        const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        orginalPassword !== req.body.password &&
        res.status(401).json("wrong password");
        const accessToken = jwt.sign({
            id:user._id ,
             isAdmin:user.isAdmin,
        },"galib",
        {expiresIn: "3d"},
        )
        const {password, ...others} = user._doc;
        res.status(200).json({...others,accessToken})

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

})


module.exports = router