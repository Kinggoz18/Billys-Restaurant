'use strict'
import {json} from "body-parser";
import { ObjectID } from "bson";
import mongoose from "mongoose";
import {
    MenuSchema,
    OrderSchema,
    AdminSchema,
    FoodSchema,
} from '../Models/Models'
import {FoodItem} from './object-models.js'

const Menu = mongoose.model('Menu', MenuSchema);
const Order = mongoose.model('Order', OrderSchema);
const Admin = mongoose.model('AuthUser', AdminSchema, 'AuthUser');
const Food = mongoose.model('Food', FoodSchema);


//Function to handle sending the AuthKey
export const AdminLogin = (req, res)=>{
    //FIX FOR CROS ORGIN ERROR, * opens up the API
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let username = req.body.username;
    let password = req.body.password;
    //console.log(Admin);
    //If the username and password sent in the request is found
    Admin.find({name: username, password: password}, (err, data)=>{
        if(err){
            console.log(err);
        }
        res.send(data); //Data contains Key for admin to use and login in the future
    });
}
function SendError(res, flag){
    //Send an access denied  message if the user does not have the valid credentials
    if(!flag)
    {
        res.send("Access Denied!");
    }
}
//Middleware Function to handle authenticating users
export const AuthenticateUser = (req, res, next)=>{
    let userKey = req.body.key;
    Admin.find({AuthKey: userKey}, (err, data)=>{
        if(err){
            console.log(err);
        }
        let flag = data.length > 0 ? true : false;
        SendError(res, flag);
        next();
    });
}
//Function to Add new Food to the Menu
export const AddFoodItem = (req, res)=>{
    //FIX FOR CROS ORGIN ERROR, * opens up the API
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let newItem = new Food(req.body);
    Menu.findByIdAndUpdate({_id: '6313d20054a183ef0c38db52'}, 
    {   $push: { FoodItem: newItem},
        $set: {name: req.body.menu}}, {new: true, useFindAndModify: false, "upsert": true}
        ,(err, done)=>{
        if(err){
            console.log(err);
        }
        res.send(done);
    })
}
//Does not really delete the menu, just replaces the array FoodItem with a blank array
export const DeleteAllFood = (req, res) =>{
    //FIX FOR CROS ORGIN ERROR, * opens up the API
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    let blank = new Food();

    Menu.findByIdAndUpdate({_id: '6313d20054a183ef0c38db52'}, 
    {   $set: { FoodItem: blank}}, {new: true, useFindAndModify: false, "upsert": true}
        ,(err, done)=>{
        if(err){
            console.log(err);
        }
        res.send(done);
    })
}
//Updates one Item in the Food Menu, See FoodSchema for all body params to include
export const UpdateFoodItem = (req, res) =>{
    //FIX FOR CROS ORGIN ERROR, * opens up the API
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    const query = {"FoodItem.name": req.params.FoodName};
    const updatePrice = {$set: { "FoodItem.$": Food(req.body)}};
    Menu.updateOne(query, updatePrice, 
    (err, done)=>{
        if(err){
            console.log(err);
        }
        res.send(done);
    })
}
//Deletes a Specific food item
export const DeleteFoodItem = (req, res)=>{
     //FIX FOR CROS ORGIN ERROR, * opens up the API
     res.header("Access-Control-Allow-Origin", "*"); 
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     const ID = req.body.idToDelete;
     const query = {
        _id: '6313d20054a183ef0c38db52',
     }
    const removeItem = {$pull: {$pull: { FoodItem: {_id: new ObjectID(ID)}}}};

    Menu.updateOne(query, removeItem,
    (err, done)=>{
        if(err){
            console.log(err);
        }
        res.send(done);
    })
}
//Returns an array containing the appropriate menu
export const LoadMenu = (req, res)=>{
    const query = {name: req.params.MenuName}
    Menu.findOne(query, (err, menu)=>{
        if(err){
            console.log(err);
        }
        const data = LoadFood(menu['FoodItem']);
        res.send(data);
    });
}
//Helper function to populate the food menu
function LoadFood(jsonData){
    let finalArray = [];
    jsonData.forEach((element)=>{
        let ItemToAdd = new FoodItem(element.name, element._id);
        finalArray.push(ItemToAdd);
    });
    return finalArray;
}

//Get Specific Order
export const GetOrder = (req, res)=>{
    //FIX FOR CROS ORGIN ERROR, * opens up the API
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    Order.findById({_id: req.params.OrderId}, (err, data)=>{
        if(err){
            console.log(err);
        }
        res.send(data); 
    });
}

//Create a new order
export const CreateOrder = (req, res)=>{
     //FIX FOR CROS ORGIN ERROR, * opens up the API
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    let newOrder = new Order(req.body);
    newOrder.save((err, contact)=>{
        if(err){
            res.send(err);
        }
        res.json(contact);
    })
}
//Get All Orders
export const GetAllOrders = (req, res)=>{
//FIX FOR CROS ORGIN ERROR, * opens up the API
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    Order.find({}, (err, data)=>{
        if(err){
            console.log(err);
        }
        res.send(data);
    });
}
export const DeleteOrder = (req, res)=>{
    //FIX FOR CROS ORGIN ERROR, * opens up the API
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    Order.findByIdAndDelete({_id: req.params.OrderId}, (err, data)=>{
        if(err){
            console.log(err);
        }
        res.send(data);
    })
}