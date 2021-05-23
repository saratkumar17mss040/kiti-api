const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProductById,
    createProduct,
} = require('../controllers/products.v1.controller');

router.route('/').get(getProducts).post(createProduct);
router.route('/:id').get(getProductById);

module.exports = router;
