const { Wishlist } = require('../models/wishlist.v1.model');
const { User } = require('../models/user.v1.model');

const getUserById = async (req, res, next, id) => {
    try {
        const user = await User.findById({ _id: id });

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'No user found associated, please check the user id!',
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

const getOrCreateWishlist = async (req, res, next, id) => {
    try {
        let wishlist = await Wishlist.findOne({ userId: id });

        if (!wishlist) {
            wishlist = new Wishlist({ userId: id, products: [] });
            wishlist = await wishlist.save();
        }
        req.wishlist = wishlist;
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

const populateWishlist = async (req, res) => {
    try {
        let { wishlist } = req;
        wishlist = await wishlist
            .populate({
                path: 'products.productId',
                select: 'name price image brand offer inStock url',
            })
            .execPopulate();

        activeProductsInWishlist = wishlist.products.filter(
            (item) => item.active,
        );
        res.status(200).json({
            success: true,
            response: activeProductsInWishlist,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                'Request failed, Please check the errorMessage key for more details',
            errorMessage: error.message,
        });
    }
};

const addOrUpdateProductInWishlist = async (req, res) => {
    try {
        const productUpdates = req.body;
        const { wishlist } = req;

        const isProductAlreadyAdded = wishlist.products.find(
            (product) => product.productId == productUpdates._id,
        );

        if (isProductAlreadyAdded) {
            for (const product of wishlist.products) {
                if (productUpdates._id == product.productId) {
                    product.active = !product.active;
                }
            }
        } else {
            wishlist.products.push({
                productId: productUpdates._id,
                active: true,
            });
        }
        let updatedWishlist = await wishlist.save();
        updatedWishlist = await updatedWishlist
            .populate({
                path: 'products.productId',
                select: 'name price image offer inStock url',
            })
            .execPopulate();

        activeProductsInWishlist = updatedWishlist.products.filter(
            (item) => item.active,
        );

        res.status(200).json({
            success: true,
            response: activeProductsInWishlist,
        });
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
    getUserById,
    getOrCreateWishlist,
    populateWishlist,
    addOrUpdateProductInWishlist,
};
