const { Cart } = require('../models/cart.v1.model');
const { User } = require('../models/user.v1.model');
const { extend } = require('lodash');

const getUser = async (req, res, next, id) => {
    try {
        const user = await User.findById({ _id: id });

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found, Please check the user id',
            });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const getOrCreateCartOfUser = async (req, res, next, id) => {
    try {
        let cart = await Cart.findOne({ userId: id });

        if (!cart) {
            cart = new Cart({ userId: id, products: [] });
            cart = await cart.save();
        }
        req.cart = cart;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const populateCart = async (req, res) => {
    try {
        let { cart } = req;
        cart = await cart
            .populate({
                path: 'products.productId',
                select: 'name price image offer inStock url',
            })
            .execPopulate();

        const activeProductsInCart = cart.products.filter(
            (item) => item.active,
        );

        res.status(200).json({
            success: true,
            response: {
                products: activeProductsInCart,
                addressId: cart.addressId,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const addOrUpdateProductInCart = async (req, res) => {
    try {
        const productUpdates = req.body;
        const { cart } = req;

        console.log(cart);
        const isProductAlreadyAdded = cart.products.find(
            (product) => product.productId == productUpdates._id,
        );

        console.log(isProductAlreadyAdded);

        if (isProductAlreadyAdded) {
            for (let product of cart.products) {
                if (productUpdates._id == product.productId) {
                    product = extend(product, productUpdates);
                }
            }
        } else {
            cart.products.push({
                productId: productUpdates._id,
                quantity: 1,
                active: true,
            });
        }
        let updatedCart = await cart.save();
        updatedCart = await updatedCart
            .populate({
                path: 'products.productId',
                select: 'name price image offer inStock url',
            })
            .execPopulate();

        const activeProductsInCart = updatedCart.products.filter(
            (item) => item.active,
        );

        res.status(200).json({
            success: true,
            response: {
                products: activeProductsInCart,
                addressId: cart.addressId,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const updateAddressIdInCart = async (req, res) => {
    try {
        addressId = req.body;
        console.log(addressId);
        let { cart } = req;
        cart.addressId = addressId._id;

        cart = await cart.save();

        cart = await cart
            .populate({
                path: 'products.productId',
                select: 'name price image offer inStock url',
            })
            .execPopulate();

        const activeProductsInCart = cart.products.filter(
            (item) => item.active,
        );
        res.status(200).json({
            success: true,
            response: {
                products: activeProductsInCart,
                addressId: cart.addressId,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

module.exports = {
    getUser,
    getOrCreateCartOfUser,
    populateCart,
    addOrUpdateProductInCart,
    updateAddressIdInCart,
};
