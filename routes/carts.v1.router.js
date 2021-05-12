const express = require('express');
const router = express.Router();

const {
    getUser,
    getOrCreateCartOfUser,
    addOrUpdateProductInCart,
    updateAddressIdInCart,
    populateCart,
} = require('../controllers/carts.v1.controller');


router.param('userId', getUser);
router.param('userId', getOrCreateCartOfUser);

router
    .route('/:userId/cart')
    .get(populateCart)
    .post(addOrUpdateProductInCart);

router.route('/:userId/cart/address').post(updateAddressIdInCart);

module.exports = router;
    