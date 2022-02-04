const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

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
    }


});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id : this._id  },"somejwtkey");
    return token;
}


const User = mongoose.model('Users', userSchema);
const userValidationSchema = Joi.object({
    fullName : Joi.string().required().max(100),
    email : Joi.string().required().max(100),
    phoneNumber : Joi.string().min(10).max(13),
    password : Joi.string().required().min(8).max(255),
 
});

module.exports.User = User;
module.exports.userValidationSchema = userValidationSchema;
module.exports.userSchema = userSchema;