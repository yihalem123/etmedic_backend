const mongoose = require("mongoose");
const catSchema = new mongoose.Schema({
    name:{type:String}
},{timestamps:true})
const Category = mongoose.model('Category', catSchema);
module.exports.Category = Category;
