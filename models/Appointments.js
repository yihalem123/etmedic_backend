const mongoose = require('mongoose');

const appointSchema = new mongoose.Schema({
    appointmentdate:{type:String,required:true},
    nookingDate:{type:String,required:true},
    priceAmount:{type:String,required:true},
    Doctor:{type:mongoose.Types.ObjectId,required:true},
    apptType:{type:String,required:true},
    is_paid:{type:Boolean,required:true,default:false}
})
const Appointments=mongoose.model('Appointments',appointSchema);
module.exports=Appointments;