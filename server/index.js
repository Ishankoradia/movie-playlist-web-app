const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
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
        console.log('error');
        res.json({success: false, error: 'invalid token'});
    }

    
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
