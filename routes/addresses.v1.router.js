const express = require('express');
const router = express.Router();

const {
    getAllAddressesOfUser,
    createNewAddress,
    updateAddress,
    deleteAddress,
} = require('../controllers/addresses.v1.controller');

router
    .route('/:userId/addresses')
    .get(getAllAddressesOfUser)
    .post(createNewAddress);

router
    .route('/:userId/addresses/:addressId')
    .post(updateAddress)
    .delete(deleteAddress);

module.exports = router;
