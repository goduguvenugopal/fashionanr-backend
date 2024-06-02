const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const dotEnv = require("dotenv")
const userRouter =  require("./router/userRouter")
const productRouter = require("./router/productRouter")

const port = process.env.PORT || 5000

// middleware 
dotEnv.config()
app.use(express.json())
app.use(express.static("public"))
app.use(cors({origin : "*"}))


//mongoose connection to the mongodb
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB is connected Successfully")
})
.catch((err)=>{
    console.error("Error occured while connecting to the mongoDB", err)
})


// router endpoints 
app.use("/authentication",userRouter);
app.use("/product" , productRouter)
app.use("/uploads" , express.static('uploads'))


// listening server 
app.listen(port, ()=>{
    console.log(`Server Connected at the port Number ${port}`)
})
