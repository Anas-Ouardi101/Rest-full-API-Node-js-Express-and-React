const express = require("express");
const dotenv = require("dotenv").config()
const Port = process.env.Port || 5000

const app = express()

app.get('/dev',(req,res)=>{
    res.status(200).json({message:"get dev"});
})

app.listen(Port,()=>console.log(`The server is runing on Port : ${Port}`));