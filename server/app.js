require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");
const cors = require('cors');
const router = require('./routes/router');


const mongourl = 'mongodb+srv://FazilShaikh:12345@cluster0.1ub3l8v.mongodb.net/Amazonweb?retryWrites=true&w=majority';

mongoose.connect(mongourl,{
    useNewUrlParser:true
}).then(()=>{console.log('connected succesfully')})
.catch((e)=>{console.log(`error ${e}`)});
const port = process.env.PORT || 8000;


app.use(express.json());
app.use(cors());
app.use(router);


app.listen(port,()=>{
    console.log(`server is runnung on port number:${port}`);
});


DefaultData();

