const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    is_approved:{type:Boolean,required:true,default:false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);