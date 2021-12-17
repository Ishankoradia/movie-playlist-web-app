const mongoose = require('mongoose');

const Movie = new mongoose.Schema(
    {
        playlist_id: {type: String, require: true},
        imdbID: {type: String, required: true},
        Title: {type: String, required: true},
        Year: {type: String},
        Poster: {type: String, required: true}
    },
    {collection: 'movies'},
)

Movie.set('timestamps', true);

const model = mongoose.model('Movie', Movie)

module.exports = model;
