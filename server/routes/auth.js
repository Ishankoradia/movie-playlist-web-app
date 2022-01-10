const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const encryptPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: encryptPassword
        });
        res.json({success: true}); 
    } catch (error) {
        res.json({success: false, error: 'Duplicate error'});  
    }   
    
})

router.post('/login', async (req, res) => {
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
        return res.json({success: false, user: false, error: "Please check your login credentials and try again."});
    }
})

router.get('/authenticate', async (req, res) => {
   
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

module.exports = router
