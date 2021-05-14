const { isString } = require('lodash');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema(
    {
        _id: {
            type: String,
        },
        name: {
            type: String,
        },
        type: {
            type: String,
        },
        level: {
            type: String,
        },
        language: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        tutorId: {
            type: Schema.Types.ObjectId,
            ref: 'Tutor',
        },
    },
    { timestamps: true },
);

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video };
