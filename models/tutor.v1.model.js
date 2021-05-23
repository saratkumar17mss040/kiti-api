const mongoose = require('mongoose');
const { Schema } = mongoose;

const tutorSchema = new Schema({
    name: {
        type: String,
        required: 'Tutor name is required',
    },
    avatar: {
        type: String,
    },
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = { Tutor };
