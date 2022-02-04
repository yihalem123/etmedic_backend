const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Doctors, DoctorValidationSchema } = require('../models/Doctor');
const { User } = require('../models/User');
const Joi  = require('joi');
const auth = require('../middlewares/auth');
const bcrypt =require('bcrypt');

router.get('/',auth, async(req,res) => {
    
    try {
        const doctors = await Doctors.find({});
        res.status(200).send(doctors);
    } 
    catch (error) {
        res.status(400).send(error.message)    
    }
});
router.get('/:id',auth, async(req,res) => {
    try {
        const id = req.params.id;
        if(mongoose.Types.ObjectId.isValid(id)){
            const doctor = await Doctors.findById(id);
            if(doctor){
                res.status(200).send(doctor);
            }
            else {
                throw new Error('Doctor not found with given Id');
            }
        }
        else {
            throw new Error('Invalid doctor  Identifier')
        }
    } 
    catch (error) {
        res.status(400).send(error.message);    
    }
});
router.post('/',async (req,res) => {
    try {
        const { error } = DoctorValidationSchema.validate(req.body);
        if(error){
            throw error;
        }
        let doctor =await Doctors.findOne({email:req.body.email});
        if(doctor){
            res.status(400).json({message:'this email already exists'})
        }
        else {
            const salt = await bcrypt.genSalt(10);  
            const hashedPassword = await bcrypt.hash(req.body.password,salt);  
            const data = req.body;
 
 
            const doctor = new Doctors({
                fullName : req.body.fullName,
                email : req.body.email,
                phoneNumber:req.body.phoneNumber,
                password : hashedPassword,
                currentWork:data.currentWork,
                category:data.category,
                about:data.about,
                education:data.education,
                experience:data.experience,
                certifications:data.experience,
                services:data.services,
                location:data.location,
                businessHours:data.businessHours,
                Pricing:data.Pricing
            });

            const result = await doctor.save();
            res.status(200).send(result);
            
        }
    } 
    catch (error) {
        res.status(400).send(error.message);    
    }

});

module.exports = router;