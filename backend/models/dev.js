const mongoose = require("mongoose")

const devSchema = mongoose.Schema({
    text:{
        type:String,
        required:[true,"Please add a txt value"],
    }
},{
    timestamps:true
})

module.exports = mongoose.model("dev",devSchema)