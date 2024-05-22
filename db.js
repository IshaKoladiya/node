const mongoose = require('mongoose');
require('dotenv').config()

const mongodbURL = "mongodb://localhost:27017/mydatabase";

mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("Connected to mongodb server")
})

db.on("error",(err)=>{
    console.log("Error to mongodb server",err)
})

db.on("disconnected",()=>{
    console.log("Disconnected to mongodb server")
})

module.exports = db;