const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/user');
const auth= require('./routes/auth');
const doctors = require('./routes/doctors');
const category = require("./routes/categories");
const conversation = require('./routes/conversations');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());
app.use("/profile",express.static('profilepics'));
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
    next();
});
const uri = "mongodb+srv://etmedic:etmedic@cluster0.7papf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth',auth)
app.use('/api/doctors',doctors)
app.use('/api/categories',category);
app.use('/api/conversation',conversation)
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
 
 
