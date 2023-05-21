const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/user")


const protect = asyncHandler(async (req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            // get token from headers
            token = req.headers.authorization.split(" ")[1]
            
            // verify token using jwt.verify() and JWT_SECRET code store at .env and decodeed twoo
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            
            // Show if the token is expired 
            const curentTime = Math.floor(Date.now() / 1000)
            if(decoded.exp && decoded.exp < curentTime){
                console.log("Token has been expired")
            }else{
                console.log("Token is still valid.")
            }
            
            // console.log(req.header("x-auth-token"))
                
            // get user from token and set it to req .select("-password") to avoid having the hash password all-over the req
                    
            req.user = await User.findById(decoded.id).select("-password")

                    // In summary, the code identifies the user by decoding and verifying the token,
                    // stores the retrieved user object in req.user, and then enables the authenticated user's
                    // information to be easily accessible in subsequent parts of the code, such as protected
                    // routes, allowing for user-specific operations and customizations.

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized")
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized , no token")
    }


})


module.exports = {
    protect
}