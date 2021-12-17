const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const Playlist = require('./models/playlist.model');
const Movie = require('./models/movie.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const colors = require('colors');
const connectDB = require('./db');

dotenv.config();

//setting up our cors policy for our development environment
app.use(cors()); //middleware

//let express know we are going to be using json parsing for req body
app.use(express.json()); //middleware

//connect to mongodb
connectDB();

app.post('/api/register', async (req, res) => {
    try {
        const encryptPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: encryptPassword
        });
        res.json({success: true}); 
    } catch (error) {
        console.log(error);
        res.json({success: false, error: 'Duplicate error'});  
    }   
    
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });

    if(!user){return res.json({success: false, error: "User does not exist"});}

    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    
    if(checkPassword){
        const token = jwt.sign({
                email: user.email,
                name: user.name,
                id: user._id
            }, process.env.APP_SECRET_KEY
        );

        return res.json({success: true, user: token});
    } else{
        return res.json({success: false, user: false});
    }
})

app.get('/api/authenticate', async (req, res) => {
   
    const token = req.headers['x-access-token'];
    
    try {
        const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);
        const email = decoded.email;  
        const user = await User.findOne({ email: email });
        
        res.json({success: true, user: user})
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }

    
})

app.post('/api/addplaylist', async (req, res) => {   

    try {
        const token = req.headers['x-access-token'];

        const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);

        const data = req.body;

        if (token === data.userdata.token){
            const playlist = await Playlist.create({
                name: data.playlist,
                user_id: data.userdata.user._id
            });
    
            return res.json({success: true, playlist: playlist});
    
        } else{
            return res.json({success: false, error: 'invalid token'});
        }
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }   
    
})


app.post('/api/getplaylists', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);

        const data = req.body;

        if (token === data.userdata.token){
            const playlists = await Playlist.find({user_id: {$eq: data.userdata.user._id} }).sort({createdAt: -1});
            return res.json({success: true, playlists: playlists});

        } else{
            return res.json({success: false, error: 'invalid token'});
        }
        
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})

app.delete('/api/deleteplaylist', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);

        const data = req.body;

        if (token === data.userdata.token){
            //remove playlist
            const p = await Playlist.deleteOne({'_id': {$eq: data._id}});
            //remove related movies also
            const m = await Playlist.deleteMany({'playlist_id': {$eq: data._id}});
            return res.json({success: true});

        } else{
            return res.json({success: false, error: 'invalid token'});
        }
        
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})


app.post('/api/savemovietoplaylists', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);

        const data = req.body;

        if (token === data.userdata.token){

            const m = await Movie.insertMany(data.movies);            

            //const playlists = await Playlist.find({user_id: {$eq: data.userdata.user._id} }).sort({createdAt: -1});
            return res.json({success: true});

        } else{
            return res.json({success: false, error: 'invalid token'});
        }
        
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})




app.post('/api/getplaylistsofselectedmovie', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);

        const data = req.body;

        if (token === data.userdata.token){           

            const p = await Movie.find({imdbID: {$eq: data.movie.imdbID}}).select('playlist_id');
            return res.json({success: true, playlists: p});

        } else{
            return res.json({success: false, error: 'invalid token'});
        }
        
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})



app.delete('/api/deletemovieplaylists', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);

        const data = req.body;

        if (token === data.userdata.token){
            console.log("deleting playlsits "+data.playlist_ids + " with movie id  "+ data.movie.imdbID);
            //remove movie playlists
            const m = await Movie.deleteMany({ imdbID: data.movie.imdbID, playlist_id: {$in: data.playlist_ids} });
            return res.json({success: true});

        } else{
            return res.json({success: false, error: 'invalid token'});
        }
        
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
