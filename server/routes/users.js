const express = require('express');
const { nameCont, postSignupController, postLoginController } = require('../controllers/userController');
const User = require('../Models/User');
const { verifyToken, varifyTokenAndAuthorization, varifyTokenAndAdmin } = require('./verifyToken');
const routes = express.Router();

//UPDATE_METHOD

routes.put("/:id", varifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            "galib"
        ).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}
)
//delete_method:-
routes.delete("/delete/:id", varifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted......")
    } catch (err) {
        res.status(500).json(err)
    }
})
//GET_method:-
routes.get("/find/:id", varifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        const {password, ...others} = user._doc;

        res.status(200).json(others) 
    } catch (err) {
        res.status(500).json(err)
    }
})
//All_user

routes.get("/", varifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users =query
        ? await User.find().sort({_id:-1}).limit(1) 
        : await User.find();

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER STATES 
routes.get("/stats",varifyTokenAndAdmin, async (req,res)=>{
    const date = new Date();
    const lasYear = new Date(date.setFullYear()-1);
    try {
        const data = await User.aggregate([
            {$match: {createdAt:{$gte: lasYear}}},
            {
                $project:{
                    month:{$month: "$createdAt"},
                }
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ]);
        res.status(200).json(data)
        
    } catch (err) {
        res.status(500).json(err);
    }
})
// routes.get('/name',nameCont);
// //localhost:5000/api/signup
// routes.post('/signup',postSignupController)
// //localhost:5000/api/login
// routes.post('/login',postLoginController)
module.exports = routes