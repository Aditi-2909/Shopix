const products = require("../models/productModel");
const cloudinary = require("../config/cloudinary");

const getProducts = async (req,res) => {
    try{
        const products = await products.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req,res) => {
    try{
        const product = await products.findById(req.params.id);
        if(product){
            res.json(product);
        }
        else{
            res.status(404).json({ message: "Product not found" });
        }
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req,res) => {
    try{
    const { name, price, description, category, stock } = req.body;
    let imageUrl = '';
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        imageUrl = result.secure_url;
    }
    const product = new products({
        name,
        price,
        description,
        category,
        stock,
        imageUrl
    });
        const saveProduct = await product.save();
        res.status(201).json(saveProduct);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProduct = async (req,res) => {
    try{
        const { name, price, description, category, stock } = req.body;
        const product = await products.findById(req.params.id);
        if(product){
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path);
                console.log(result);
                product.imageUrl = result.secure_url;
            }
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        }
        else{
            res.status(404).json({ message: "Product not found" });
        }
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}