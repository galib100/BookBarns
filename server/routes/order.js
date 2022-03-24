const express = require('express');
const Cart = require('../Models/Cart');
const Order = require('../Models/Order');
const Product = require('../Models/Product');
const { verifyToken, varifyTokenAndAuthorization, varifyTokenAndAdmin } = require('./verifyToken');
const routes = express.Router();

/// CREATE
routes.post("/add",verifyToken,async(req,res)=>{
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err);
    }
})


//UPDATE_orders

routes.put("/:id", varifyTokenAndAdmin, async (req, res) => {
     
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

// //delete_method:-
routes.delete("/delete/:id", varifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted......")
    } catch (err) {
        res.status(500).json(err)
    }
})
// // //GET_USER_ORDer:-
routes.get("/find/:userId",varifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find(
            {userId: req.params.userId})
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
})
// All_ORDERS

routes.get("/",varifyTokenAndAdmin,async (req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
        
    } catch (err) {
        res.status(500).json(err)
    }
} )

// GET MONTHLY INCOME 
routes.get("/income",varifyTokenAndAdmin, async (req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
    try {
        const income = await Order.aggregate([
            { $match:{ createdAt: {$gte: prevMonth }}},
            {
                $project:{
                    month: { $month: "$createdAt"},
                    sales:"$amount",
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum: "$sales"}
                },
            }
        ]);
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err);
    }

})
module.exports = routes