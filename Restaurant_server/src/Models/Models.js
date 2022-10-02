import mongoose from "mongoose";

const Schema = mongoose.Schema;
//Menu Schema

//An array of food objects 
export const FoodSchema = new Schema({
    name: {
        type: String,
        required: 'Enter item name'
    },
    price: {
        type: Number,
        required: 'Enter Item price'
    },
    rating: {
        type: Number,
        default: 0
    },
    side: {
        type: Boolean,
        default: false
    },
    swallow: {
        type: Boolean,
        default: false
    },
    soup: {
        type: Boolean,
        default: false
    },
    drink: {
        type: Boolean,
        default: false
    }
});
export const MenuSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    FoodItem: [{}]
});
//Order schema
export const OrderSchema = new Schema({
    OrderedBy: {
        type: String,
        required: 'Enter a name'
    },
    PhoneNumber: {
        type: Number,
    },
    OrderSummary:{
        type: String,
        required: true
    },
    TotalCost: {
        type: Number,
        required: true
    }
});

export const AdminSchema = new Schema({
   AuthKey: {
        type: String
    },
    name:{
        type: String
    },
    password:{
        type: String
    }
})