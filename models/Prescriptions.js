const mongoose = require("mongoose");
const prescriptionSchema = new mongoose.Schema({
    drugName:{type:String,required:true},
    dose:{type:String,required:true},
    price:{type:String,required:true}

},{timestamps:true})
const Prescription=mongoose.model('Prescription',prescriptionSchema);
module.exports=Prescription;