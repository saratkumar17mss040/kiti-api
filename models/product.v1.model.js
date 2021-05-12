const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: 'Product name is required',
            unique: [true, 'Product name is already in the DB'],
        },

        price: {
            type: Number,
            required: 'Product price is required',
        },

        description: {
            type: [String],
            required: 'Product description is required',
        },

        image: {
            type: String,
        },

        category: {
            type: String,
            required: 'Product category is required',
        },

        brand: {
            type: String,
        },

        inStock: {
            type: Boolean,
            required: 'Product stock information is required',
        },

        starRating: {
            type: Number,
            default: 0,
        },

        fastDelivery: {
            type: Boolean,
        },

        quantity: {
            type: Number,
            required: 'Product available quantity information is required',
        },

        offer: {
            type: Number,
            default: 0
        },

        url: {
            type: String,
            validate: {
                validator: (value) => {
                    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
                    return urlRegex.test(value);
                },
                message: (props) => `Product URL - ${props.value} is invalid`,
            },
            required: 'Product URL is required',
            // need to add unique later
        },
    },
    { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
