const express = require('express');
const Product = require('../Models/Product');
const { verifyToken, varifyTokenAndAuthorization, varifyTokenAndAdmin } = require('./verifyToken');
const routes = express.Router();

/// CREATE
routes.post("/add",varifyTokenAndAdmin,async(req,res)=>{
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err);
    }
})


//UPDATE_PRODUCT

routes.put("/:id", varifyTokenAndAdmin, async (req, res) => {
     
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

//delete_method:-
routes.delete("/delete/:id", varifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted......")
    } catch (err) {
        res.status(500).json(err)
    }
})
// //GET_Product:-
routes.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        const {title, ...others} = product._doc;

        res.status(200).json(others) 
    } catch (err) {
        res.status(500).json(err)
    }
})
// //All_PRODUCt

routes.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
       let products ;

       if (qNew) {
           products = await Product.find().sort({createdAt:-1}).limit(5);
       } else if (qCategory) {
        products = await Product.find({
            categories: {
                $in: [qCategory],
            }
        })
       }
       else{
           products = await Product.find();
       }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = routes