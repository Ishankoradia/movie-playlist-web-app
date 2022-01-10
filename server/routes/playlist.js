const Playlist = require('../models/playlist.model');
const Movie = require('../models/movie.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/playlists', async (req, res) => {   

    try {       
        const data = req.body;
       
        const playlist = await Playlist.create({
            name: data.playlist,
            user_id: req.user_id, //from the authentication middleware
            is_public: data.is_public
        });

        return res.json({success: true, playlist: playlist});
    
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }   
    
})


router.get('/playlists', async (req, res) => {
    try {

        const playlists = await Playlist.find({user_id: {$eq: req.user_id} }).sort({createdAt: -1});
        return res.json({success: true, playlists: playlists});
        
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})

router.delete('/playlists/:playlistId', async (req, res) => {
    try {
            //remove playlist
            const p = await Playlist.deleteOne({'_id': {$eq: req.params.playlistId}});
            //remove related movies also
            const m = await Movie.deleteMany({'playlist_id': {$eq: req.params.playlistId}});
            return res.json({success: true});
        
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})


router.get('/playlists/movies/:imdbID', async (req, res) => {
    try {      

        const p = await Movie.find({imdbID: {$eq: req.params.imdbID}}).select('playlist_id');
        return res.json({success: true, playlists: p});      
        
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})

module.exports = router;
