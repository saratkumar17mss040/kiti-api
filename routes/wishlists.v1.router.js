const express = require('express');
const router = express.Router();

const {
    getUserById,
    getOrCreateWishlist,
    populateWishlist,
    addOrUpdateProductInWishlist,
} = require('../controllers/wishlists.v1.controller');

router.param('userid', getUserById);

router.param('userid', getOrCreateWishlist);

router
    .route('/:userid/wishlist')
    .get(populateWishlist)
    .post(addOrUpdateProductInWishlist);

module.exports = router;
