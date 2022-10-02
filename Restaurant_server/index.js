'use strict';
import express from 'express';
import mongoose from 'mongoose';
import route from './src/routes/route';

const app = express();
const PORT_NUM = 4000;

//Mongooese Connection
const url = "mongodb://0.0.0.0:27017/FoodStore"
mongoose.Promise = global.Promise;
mongoose.connect(url ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));
//bodyparser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Decalre the route
route(app);

//Have the app start listening
app.listen(PORT_NUM, ()=>{
    console.log(`Listening Port ${PORT_NUM}`);
   })
   