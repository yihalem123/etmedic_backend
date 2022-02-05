const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Doctors, DoctorValidationSchema } = require('../models/Doctor');
const { User } = require('../models/User');
const Joi  = require('joi');
const auth = require('../middlewares/auth');
const bcrypt =require('bcrypt');
const upload = require('../multer/multer')

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
router.post('/',auth,async (req,res) => {
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
router.get("/",auth,async (req, res) => {
    const categoryname = req.query.category;
    const services = req.query.services;
    try {
      let doctors;
      if (categoryname) {
        doctors = await Doctors.find({ category:categoryname });
      } else if (services) {
        doctors = await Doctors.find({
          services: {
            $in: [services],
          },
        });
      } else {
        doctors = await Doctors.find();
      }
      res.status(200).json(doctors);
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.post('/addProfilePic/:id',auth,upload.single('profile'), async(req,res) => {
    try {
        const id = req.params.id;
        if(mongoose.Types.ObjectId.isValid(id)){
            const user = await Doctors.findById(id);
            if(user){
                if(req.file){
                    const userWithPp = await Doctors.findByIdAndUpdate(id, {

                        
                        profile : req.file.path
                    }, { new : true});
                    res.status(200).send(userWithPp);
                }
                else {
                    throw new Error('Picture To Upload Is Not Found');
                }
            }
            else {
                throw new Error('User not found with given ID')
            }
        }
        else {
            throw new Error('Invalid User Identifier');
        }
    } 
    catch (error) {
        res.status(400).send(error.message)    
    }
});

module.exports = router;