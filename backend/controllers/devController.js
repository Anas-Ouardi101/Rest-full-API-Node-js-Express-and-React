const asyncHandler = require("express-async-handler")
const Dev = require("../models/dev")


// @description GET Dev
// @route GET /api/dev
// @access Privet
const getDev = asyncHandler( async (req,res)=>{
    console.log(req.user.id)
    const dev = await Dev.find({user:req.user.id})
    res.status(200).json(dev)
})


// @description Post Dev
// @route GET /api/dev
// @access Privet
const postDev = asyncHandler( async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error("Please add text field")
    }

    const dev = await Dev.create({
        user:req.user.id,
        text:req.body.text
    })
    res.status(200).json(dev)
    
})


// @description PUT Dev
// @route GET /api/dev/:id
// @access Privet
const putDev = asyncHandler( async (req,res)=>{

    const id = req.params.id
    const userDev = await Dev.findOneAndUpdate({_id:id,user:req.user},req.body,{new:true})
    
    if(!userDev){
        res.status(400)
        throw new Error("Dev not found or User is not authorize")
    }
    res.status(200).json(userDev)
})


// @description DELETE Dev
// @route GET /api/dev/:id
// @access Privet
const deleteDev = asyncHandler( async (req,res)=>{

    const id = req.params.id
    const userDev = await Dev.findOneAndDelete({_id:id,user:req.user})
    if(!userDev){
        res.status(400)
        throw new Error("Dev not found or User is not authorize")
    }
    res.status(200).json(userDev)
})


module.exports = {
    getDev,
    postDev,
    putDev,
    deleteDev
}