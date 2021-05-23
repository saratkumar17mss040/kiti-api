const { Product } = require('../models/product.v1.model');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, response: products });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = req.params;
        const product = await Product.findById({ _id: productId.id });
        if (product) {
            res.status(200).json({ success: true, response: product });
        } else {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = new Product(productData);
        const newProductResponse = await newProduct.save();
        res.status(201).json({ success: true, response: newProductResponse });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
};
