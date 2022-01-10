const express = require('express');
const app = express();
const cors = require('cors');
const Playlist = require('./models/playlist.model');
const Movie = require('./models/movie.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const playlistRoutes = require('./routes/playlist');
const movieRoutes = require('./routes/movie');

dotenv.config();

//setting up our cors policy for our development environment
app.use(cors()); //middleware

//let express know we are going to be using json parsing for req body
app.use(express.json()); //middleware

//connect to mongodb
connectDB();

app.get('/', (req, res) => res.send('Hello'));

app.use('/api', authRoutes);

app.use('/api', playlistRoutes);

app.use('/api', movieRoutes);

app.get('/playlistview/:id', async (req, res) => {
    try {
        const playlist_id = req.params.id;

        const playlist = await Playlist.findOne({_id: playlist_id, is_public: {$eq: true}});

        if(playlist){
            const movies = await Movie.find({playlist_id: {$eq: playlist_id} }).sort({createdAt: -1});

            return res.json({success: true, movies: movies, playlist: playlist});
        }

        res.json({success: false, error: 'Only public playlists can be accessed.'});       
    
    } catch (error) {
        res.json({success: false, error: 'invalid token'});
    }    
    
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
