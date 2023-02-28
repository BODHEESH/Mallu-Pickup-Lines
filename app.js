const express = require("express");
const app = express()
const port = process.env.PORT || 3001;


app.use(express.json())

const connectDB = require("./helpers/mongo_init")
connectDB()



app.listen(port,()=>console.log(`🚀 server is running at port 🫦 ${port}`))

