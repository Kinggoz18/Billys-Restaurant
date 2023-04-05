import { CustomerAccount } from './AccountObject.mjs';  //Importing the object

//Account to create
let AccountToCreate = {
    _id: "string",
    firstName: "Testing",
    lastName: "Tester",
    phoneNumber: "6873343486",
    emailAddress: "Testing@outlook.com",
    password: "tester123"
}

//admin login data
let LoginInfo = {
    emailAddress: "Testing@outlook.com",
    password: "tester123"
}

let customer = new CustomerAccount(); //Create instance of AdminAccount
let CustomerInfo = null;  //Hold Admin data
let loginResult = null;    //Hold the data after login



//******* Test for Update Points
await TestUsePoints("32769256477667202330549PM")    //Sets the admin info to null

async function TestUsePoints(id){
    await customer.UseCustomersPoints(id)
    CustomerInfo = customer.GetCustomerInfo;
    console.log(CustomerInfo);
}


// import { MenuItemObject } from "./MenuItemObject.mjs";
// generateMenuItems();
// let imageFile;
// let Mains = ["Chicken and Peas", "Chicken and Rice", "Chicken and salad", "Jerk Meal", "BBQ Meal"];
// let Sides = ["BBQ Chicken", "Jerk Chicken", "Fish", "Cookies", "Brownies"];
// let Drinks = ["Coca Cola", "Orange Juice", "Apple Juice", "Sprite", "Fanta", "Energy Drink"];
// let menuItemsArray = [];
// let menuItem = new MenuItemObject();
// const imagePath = '/Users/chigoziemuonagolu/Desktop/Billys-Restaurant/restaurant_frontend/src/components/Images/food1.jpg'; 

// function generateMenuItems(){

//     Mains.forEach(Element=>{
//         let temp = {
//             _id: null,
//             Name: Element,
//             Price: 12.50,
//             Menu: "Mains",
//             OrderCount: null,
//             ImageLink: null,
//         }
//         menuItemsArray.push(temp);
//     })
//     Sides.forEach(Element=>{
//         let temp = {
//             _id: null,
//             Name: Element,
//             Price: 7.80,
//             Menu: "Sides",
//             OrderCount: null,
//             ImageLink: null,
//         }
//         menuItemsArray.push(temp);
//     })
//     Drinks.forEach(Element=>{
//         let temp = {
//             _id: null,
//             Name: Element,
//             Price: 3.50,
//             Menu: "Drinks",
//             OrderCount: null,
//             ImageLink: null,
//         }
//         menuItemsArray.push(temp);
//     })
// }