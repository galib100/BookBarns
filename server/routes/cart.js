const express = require('express');
const Cart = require('../Models/Cart');
const Product = require('../Models/Product');
const { verifyToken, varifyTokenAndAuthorization, varifyTokenAndAdmin } = require('./verifyToken');
const routes = express.Router();

/// CREATE
routes.post("/add",verifyToken,async(req,res)=>{
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err);
    }
})


//UPDATE_PRODUCT

routes.put("/:id", varifyTokenAndAuthorization, async (req, res) => {
     
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

// //delete_method:-
routes.delete("/delete/:id", varifyTokenAndAdmin, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted......")
    } catch (err) {
        res.status(500).json(err)
    }
})
// // //GET_USERCart:-
routes.get("/find/:userId",varifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findByOne(
            {userId: req.params.userId})
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err)
    }
})
// All_PRODUCt

routes.get("/",varifyTokenAndAdmin,async (req,res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
        
    } catch (err) {
        res.status(500).json(err)
    }
} )
module.exports = routes