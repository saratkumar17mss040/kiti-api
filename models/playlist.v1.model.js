const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        thumbnail: {
            type: String,
            default:
                'https://i.postimg.cc/BZxHVfvR/jason-briscoe-Glia-HAJ3-5-A-unsplash.jpg',
        },
        type: {
            type: String,
            enum: ['custom', 'liked', 'history', 'watchLater'],
            default: 'custom',
        },
        isDefault: { type: Boolean, default: false },
        videoList: [
            {
                videoId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Video',
                },
                date: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true },
);

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = { Playlist };
