const mongoose = require('mongoose');

const Playlist = new mongoose.Schema(
    {
        name: {type: String, required: true},
        user_id: {type: String, required: true},
        is_public: {type: Boolean, default: false}
    },
    {collection: 'playlists'}
)

Playlist.set('timestamps', true);

const model = mongoose.model('Playlist', Playlist)

module.exports = model;