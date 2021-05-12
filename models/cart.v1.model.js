const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        products: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, default: 1 },
                active: Boolean,
            },
        ],
        addressId: {
            type: Schema.Types.ObjectId,
            ref: 'Address',
            default: null,
        },
    },
    { timestamps: true },
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = { Cart };
