'use strict';
import express from 'express';
import mongoose from 'mongoose';
//import route from './src/routes/route';
import { ConnectMongoDB } from './Libraries/Database.js'

const app = express();
const PORT_NUM = 4000;

//Mongoose Connection setup
const url = "mongodb+srv://BillysRestaurant:Restaurant2022@billyscluster.dktaru5.mongodb.net/test"
mongoose.Promise = global.Promise;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log('Connected to MongoDB');})
.catch((err)=>{if(err){console.log(err);}})

//bodyparser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Decalre the route

//Have the app start listening
app.listen(PORT_NUM, ()=>{
    console.log(`Listening Port ${PORT_NUM}`);
   })
