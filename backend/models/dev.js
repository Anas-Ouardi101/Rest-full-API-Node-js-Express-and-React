const mongoose = require("mongoose")

const devSchema = mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },

    text:{
        type:String,
        required:[true,"Please add a txt value"],
    }
},{
    timestamps:true
})

module.exports = mongoose.model("dev",devSchema)