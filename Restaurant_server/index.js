'use strict';
import express from 'express';
//import route from './src/routes/route';
import { ConnectDB } from './Libraries/Database.js'

const app = express();
const PORT_NUM = 4000;

//MSSQL Connection
ConnectDB()

//bodyparser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Decalre the route

//Have the app start listening
app.listen(PORT_NUM, ()=>{
    console.log(`Listening Port ${PORT_NUM}`);
   })
