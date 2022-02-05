const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User , userValidationSchema } = require('../models/User');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    // First Validate The HTTP Request
    const { error } = authRequestValidate.validate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    //  Now find the user by their email address
    const user = await User.findOne({ email : req.body.email});
    
    if (!user) {
        return res.status(400).send('Incorrect email or password');
    }

    // Then validate the Credentials in MongoDB match
    // those provided in the request
   
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }
    const token = user.generateAuthToken();
    const hiddenPassword = await User.findById(user._id).select("_id  email fullName phoneNumber profile"); 
    res.header('x-auth-token',token).json(hiddenPassword);
});
const authRequestValidate = Joi.object({
    email : Joi.string().min(8).max(100),
    password : Joi.string().min(8).max(255)
});



module.exports = router; 