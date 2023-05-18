const express = require("express");
const dotenv = require("dotenv").config()
const Port = process.env.Port || 5000
const devRouts = require("./routes/devRouts")
const errHandler = require("./middleware/errMiddleware")
const colors = require("colors")
const connectDb = require("./config/db")


connectDb()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/dev",devRouts)
app.use(errHandler.errHandler)

app.listen(Port,()=>console.log(`The server is runing on Port : ${Port}`));