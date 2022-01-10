const Playlist = require('../models/playlist.model');
const Movie = require('../models/movie.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.delete('/playlists/:playlistId/movies/:movieId', async (req, res) => {
    try {
        //remove movie 
        const m = await Movie.deleteOne({_id: req.params.movieId, playlist_id: {$eq: req.params.playlistId} });
        return res.json({success: true});
        
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})

router.get('/movies/:playlistId', async (req, res) => {
    try {
        const movies = await Movie.find({playlist_id: {$eq: req.params.playlistId} }).sort({createdAt: -1});
        return res.json({success: true, movies: movies});
        
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})


router.delete('/movies/:imdbID', async (req, res) => {
    try {
        const data = req.body;
        //remove movie playlists
        const m = await Movie.deleteMany({ imdbID: req.params.imdbID, playlist_id: {$in: data.playlist_ids} });
        return res.json({success: true});
        
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})

router.post('/movies', async (req, res) => {
    try {       
        const data = req.body;
        const m = await Movie.insertMany(data.movies);  
        //const playlists = await Playlist.find({user_id: {$eq: data.userdata.user._id} }).sort({createdAt: -1});
        return res.json({success: true});
        
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})

module.exports = router;