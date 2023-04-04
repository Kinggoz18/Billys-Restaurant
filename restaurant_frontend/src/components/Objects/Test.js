import { AdminAccount } from './AccountObject.js';  //Importing the object

//Account to create
let AccountToCreate = {
    _id: "",
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

let admin = new AdminAccount(); //Create instance of AdminAccount
let AdminInfo = null;  //Hold Admin data
let loginResult = null;    //Hold the data after login

//******* Test for create admin account
await TestCreateAccount();
ValidateCreateAccount(AdminInfo);   //Validate the data

//******* Test for update admin account
let oldAccountInfo = AdminInfo;  //Variable to hold the old account info
await TestUpdateAccount();
ValidateUpdateAccount(AdminInfo, oldAccountInfo)


//******* Test to for admin login
//TestLoginAccount();

//******* Test for delete admin account
//TestDeleteAccount();


//Function to test the account information is correct
function ValidateCreateAccount(AdminInfo){
    //Check Validity 
    if(AdminInfo == null){
        console.log("Test Failed");
    }
    else{
        console.log(JSON.stringify(AdminInfo));
    }
}

//Function to validate update account
function ValidateUpdateAccount(AdminInfo, oldAccountInfo){
    //Check Validity 
    let isSame = true;
    for(let i =0; i<AdminInfo.length; i++){
        if(AdminInfo[i] !== oldAccountInfo[i]){
            isSame = false;
            break;
        }
    }
    //Check Validity 
    if(!isSame){
        console.log("Test Failed");
    }
    else{
        console.log("Successfully Updated: \n" +JSON.stringify(oldAccountInfo));
    }
}
//Function to create an account
async function TestCreateAccount(){
    return admin.CreateAdmin(AccountToCreate).then(()=>{
        AdminInfo = admin.GetAdminInfo;
    })
}

async function TestUpdateAccount(){
    //Update the name properties
    AdminInfo.firstName = "Mikey";
    AdminInfo.lastName = "Williams";

    return admin.UpdateAdmin(AdminInfo).then(()=>{
        AdminInfo = admin.GetAdminInfo;    //Set the new account
    });
}

async function TestLoginAccount(){
    let login = {
        EmailAddress: AdminInfo.EmailAddress,
        Password: AccountToCreate.Password
    }
    let loginResult = await admin.AdminLogin(login);
    console.log(JSON.stringify(loginResult));
}
async function TestDeleteAccount(){
    admin.DeleteAdmin(AdminInfo._id);
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