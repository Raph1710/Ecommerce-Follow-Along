const express = require("express");
const Product = require("../model/product");
const User = require("../model/user");
const router = express.Router();
const { productUpload } = require("../middleware/multer");

const validateProductData = (data) => {
    const errors = []
    if (!data.name) {
        errors.push("Product name is required")
    }
    if (!data.description) {
        errors.push("Product description is required")
    }
    if (!data.Category) {
        errors.push("Product category is required")
    }
    if (!data.price || isNaN(data.price) || data.price <=0) {
        errors.push("Product price is required")
    }
    if (!data.stock) {
        errors.push("Product stock is required")
    }
    if (!data.email) {
        errors.push("Product email is required")
    }
    if (!data.images) {
        errors.push("Product image is required")
    }
    return errors;
}

router.post('/productcreate', productUpload.array('images', 10), async (req, res) => {
    
    const {name, description, category, tags, price, stock, email} = req.body;
    const images = req.file.map((file) => file.path);

    const ValidationErrors = validateProductData({name, description, category, price, stock, email});
    if(ValidationErrors.length>0){
        return res.status(400).json({errors: ValidationErrors})
    }
    if(images.length() === 0){
        return res.send(400).json({error: "At least one image is required"});
    }

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.send(400).json({error: "User not found"});
        }

        const newProduct = new Product({
            name,
            description,
            category,
            tags,
            price,
            stock,
            email,
            images
        });

        await newProduct.save();
        res.send(201).json({
            message: "Product created successfully",
            product: newProduct
        });
    }catch(error){
        console.log(error);
        res.status(500).json({error:'Server error. Could not create the product.'})
    }   

});

module.exports = router