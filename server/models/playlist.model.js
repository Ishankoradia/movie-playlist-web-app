const mongoose = require('mongoose');

const Playlist = new mongoose.Schema(
    {
        name: {type: String, required: true},
        user_id: {type: String, required: true}
    },
    {collection: 'playlists'}
)

Playlist.set('timestamps', true);

const model = mongoose.model('Playlist', Playlist)

module.exports = model;