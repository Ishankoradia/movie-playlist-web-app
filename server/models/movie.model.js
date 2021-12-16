const mongoose = require('mongoose');

const Movie = new mongoose.Schema(
    {
        playlist_id: {type: String, require: true},
        imdb_id: {type: String, required: true},
        title: {type: String, required: true},
        year: {type: String},
        poster: {type: String, required: true}
    },
    {collection: 'movies'}
)

const model = mongoose.model('Movie', Movie)

module.exports = model;