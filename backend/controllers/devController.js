const asyncHandler = require("express-async-handler")
const Dev = require("../models/dev")


// @description GET Dev
// @route GET /api/dev
// @access Privet
const getDev = asyncHandler( async (req,res)=>{
    const dev = await Dev.find()
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
        text:req.body.text
    })
    res.status(200).json(dev)
    
})


// @description PUT Dev
// @route GET /api/dev/:id
// @access Privet
const putDev = asyncHandler( async (req,res)=>{
    const id = req.params.id
    const dev = await Dev.findById(id)
    // console.log(dev)
    if(!dev){
        res.status(400)
        throw new Error("Dev not found")
    }
    const updateDev = await Dev.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(updateDev)
})


// @description DELETE Dev
// @route GET /api/dev/:id
// @access Privet
const deleteDev = asyncHandler( async (req,res)=>{
    const id = req.params.id;
    const deletedDev = await Dev.findByIdAndRemove(id)
    res.status(200).json(deletedDev)
})


module.exports = {
    getDev,
    postDev,
    putDev,
    deleteDev
}