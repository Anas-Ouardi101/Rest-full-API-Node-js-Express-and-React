const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/user")
require("dotenv").config()


// @description Register new user
// @route Post /api/users
// @access Public
const userRegister = asyncHandler( async (req,res)=>{
    // Check all feilds require:
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error("All fields Required")
    }
    
    // Check User Exist :
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(500)
        throw new Error("User alrady found")
    }

    // Hash Password :
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // Create User :
    const user  = await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201)
           .json({
                _id:user.id,
                email:user.email,
                name:user.name,
                token:generateToken(user._id)
            })
    }else{
        res.status(400)
        throw new Error("Invalide data")
    }

})

// @description Login Auth  user
// @route Post /api/users/login
// @access Public
const userLogin = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    // Check input required :
    if(!email || !password){
        res.status(500)
            .json({message:"All Feild are require"})
    }

    // Check user existens and mache password :
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
       return res.status(200)
            .json({
                _id:user.id,
                email:user.email,
                name:user.name,
                token:generateToken(user._id)
            })
    }else{
       res.status(400)
       throw new Error("Invalide credintials")
    }

})

// @description Get data login user
// @route GET /api/users/me
// @access Privet
const getMe = asyncHandler (async (req,res)=>{
    const {_id,name,email} = await User.findById(req.user.id)
    res.status(200)
        .json({
            id:_id,
            email,
            name
        })
})

// Genarate tokon :
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}



module.exports = {
    userRegister,
    userLogin,
    getMe
}