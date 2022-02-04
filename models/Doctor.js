const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const doctorSchema =  new mongoose.Schema({
    fullName : {
        type : String,
        required : [ true, "Enter Full Name"],
        maxlength : 50,
        minlength : 3
    },

    phoneNumber : {
        unique : true,
        type : String,
        maxlength : 13,
        minlength : 10,
        validate : {
            validator : (pn) => {
                const pnRegexFull = /^[+][2][5][1][9][0-9]/;
                const pnRegexSmall = /^[0][9][0-9]/;
                if(pn.length === 13){
                    return pnRegexFull.test(pn);
                }
                else if(pn.length === 10){
                    return pnRegexSmall.test(pn);
                }
                else {
                    return false;
                }
            },
            error : "Invalid Phone Number"
        }
    },
    
    email : {
        type : String,
        unique : true,
        maxlength : 100,
        minlength : 10,
        required : [ true, "email is required"],
        validate : {
            validator : (email) => {
                const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                return regex.test(email);
            },
            message : "Email is not valid"
        }
    },

    password : {
        type : String,
        minlength : 8,
        maxlength : 255,
        required : [true , "password is required"]
    },

    profile : {
        type : String,
        maxlength : 255,
    },
    currentWork:{
        type:String,
        maxlength:255
    },
    category:{
        type:String,
        required:true,
        maxlength:255
    },
    about:{
        type:String,
        required:true,
        maxlength:355
    },
    education:{
        type:Array,
        required:true,
        
    },
    experience:{
        type:Array,
        
    },
    certifications:{
        type:Array
    },
    services:{
        type:Array
    },
    Reviews:{
        type:Array
    },
    location:{
        type:String
    },
    businessHours:{
        type:Array
    },
    Pricing:{
        type:String
    },
    Rating:{
        type:String
    },
    is_active:{
        type:Boolean,
        required:true,
        default:false

    }

});

const DoctorValidationSchema = Joi.object({
    fullName : Joi.string().required().max(100),
    email : Joi.string().required().max(100),
    phoneNumber : Joi.string().min(10).max(13),
    password : Joi.string().required().min(8).max(255),
    currentWork:Joi.string().min(6).max(255),
    category:Joi.string().min(5).max(100),
    about:Joi.string().min(50).max(400),
    education:Joi.array().items(Joi.string()),
    experience:Joi.array().items(Joi.string()),
    certifications:Joi.array().items(Joi.string()),
    services:Joi.array().items(Joi.string()),
    Reviews:Joi.array().items(Joi.string()),
    location:Joi.string().min(6).max(255),
    businessHours:Joi.array().items(Joi.string()),
    Pricing:Joi.string().min(3).max(255),


 
});

const Doctors = mongoose.model('Doctors', doctorSchema);
module.exports.Doctors = Doctors;
module.exports.DoctorValidationSchema = DoctorValidationSchema;