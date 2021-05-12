const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    streetAddress: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    phoneNumber: String,
});

const Address = mongoose.model('Address', addressSchema);

module.exports = { Address };
