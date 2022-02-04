const { User , userValidationSchema } = require('../models/User');
const router  =require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
router.post('/signup',async (req,res)=>{
    const { error } = userValidationSchema.validate(req.body);
    if(error){
        console.log(error)
       return res.status(401).json(error.details[0].messager);
    }
    //check if the user already exists
    let user =await User.findOne({email:req.body.email});
    if(user){
        res.status(400).json({message:'user already exists'})
    }else{
        const salt = await bcrypt.genSalt(10);  
        const hashedPassword = await bcrypt.hash(req.body.password,salt);  
        const user = new User({
            fullName : req.body.fullName,
            email : req.body.email,
            phoneNumber:req.body.phoneNumber,
            password : hashedPassword
        });
        await user.save();
        const hiddenPassword = await User.findById(user._id).select("_id  email fullName phoneNumber");          
        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send(hiddenPassword);
    }
});
router.get('/', async (req,res)=>{
  try{
      const users = await User.find();
      res.status(200).json(users);
  }catch(err){
      console.log(err);
      res.status(401).json(err);
  }
});
router.delete('/:id',async(req,res) => {

    try {
        const id = req.params.id;
        if(mongoose.Types.ObjectId.isValid(id)){
            const deleted = await User.findByIdAndDelete(id);
            if(deleted)
                res.status(200).send(deleted);
            else 
                throw new Error('User Not Found With Given Id');
        }   
        else {
            throw new Error('Invalid User Id');
        } 
    } 
    catch (error) {
        res.status(400).send(error.message)    
    }
});
router.get('/:id' ,async(req,res) => {
    
    try {
        const id = req.params.id;
        if(mongoose.Types.ObjectId.isValid(id)){
            const user = await User.findById(id);
            if(user)
                res.status(200).send(user);
            else 
                throw new Error('User Not Found With Given Id')
        }
        else {
            throw new Error('Invalid User Id')
        }
    } 
    catch (error) {
        res.status(400).send(error.message);        
    }
});
module.exports = router;