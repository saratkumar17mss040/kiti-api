const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video',
    },
    title: {
        type: String,
        default: 'Kiti-notes',
    },
    description: {
        type: String,
    },
    time: {
        type: String,
    },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = { Note };
