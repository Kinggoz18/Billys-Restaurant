'use strict'
//imports
import {Menu, MenuItem} from './Objects/ObjectExports.mjs'

//Global variables
let MenuObj = new Menu.MenuObject();
let MenuItemObj = new MenuItem.MenuItemObject();


window.addEventListener("DOMContentLoaded", async ()=>{
    let CreatMenuBtn = document.getElementById('createMenuBTN');
    let AddMenuItem = document.getElementById('AddMenuItemBTN')
    //Event listner for .....
    document.getElementById("Profile").addEventListener("submit", function(event) {
        event.preventDefault();
        checkPassword();
    });

    //Populate the menu ItemList
    let menuList = document.getElementById('MenuItemMenu');
    await MenuObj.GetAllMenu().then((data)=>{
        let current = "<option value=0>Select Item Menu</option>";
        data.forEach(element => {
            let name = element['name'];
            current +=  `<option value=${name}>${name}</option>`
        });
        menuList.innerHTML = current;
    })
    //Event Listener to create a menu
    CreatMenuBtn.addEventListener('click', CreateMenu);
    //Event Listener to Add a menu
    AddMenuItem.addEventListener('click', AddItem);
    //Event Listener to delete a menu
    DeleteMenuBtn.addEventListener('click', DeleteMenu);
});

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("new-password").value = "";
  document.getElementById("phone").value = "";
}

function checkPassword() {
  var oldPassword = document.getElementById("password").value;
  var newPassword = document.getElementById("new-password").value;
  if (oldPassword === newPassword) {
    alert("The old password and the new password cannot be the same.");
  }
  else {
    // If the old and new passwords are not the same, you can submit the form
    document.getElementById("Profile").submit();
  }
}
function isValidEmail(email) {
  // Regular expression for validating email
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Check if the email matches the pattern
  if(emailPattern.test(email)) {
    return true;
  } else {
    return false;
  }
}

//Function to Add a menu
async function CreateMenu(){
    let menuName = document.getElementById('MenuName').value;
    if(menuName === "" || menuName.length === 0 || menuName=== null){
        console.log('Throw error here! No Menu Selected');
        return;
    }
    else{
        await MenuObj.AddMenu(menuName).then(()=>{
            console.log('Throw Success here! Menu Created');
            window.location.reload();
        });
        
    }
}
//Function to delete a menu
async function DeleteMenu(){
  let menuName = document.getElementById('MenuName').value;
  if(menuName === "" || menuName.length === 0 || menuName=== null){
      console.log('Throw error here! No Menu Selected');
      return;
  }
  else{
      await MenuObj.DeleteMenu(menuName).then(()=>{
          console.log('Throw Success here! Menu Deleted');
          window.location.reload();
      });
      
  }
}


//Function to Add a menu item
async function AddItem(){
    let name = document.getElementById('MenuItemName').value;
    let price = document.getElementById('MenuItemPrice').value;
    let menu = document.getElementById('MenuItemMenu').value;
    let image = document.getElementById('MenuItemImage').files[0];;
    if(name === ''){
        console.log('Name not selected. Throwing Error!');
        return;
    }
    if(price === ''){
        console.log('Price not selected. Throwing Error!');
        return;
    }
    if(menu == 0){
        console.log('Menu not selected. Throwing Error!');
        return;
    }
    if(image === "" || image === null)
    {
        console.log('Image not selected. Throwing Error!');
        return;
    }
    let ItemToCreate = {
        _id: null,
        Name: name,
        Price: price,
        Menu: menu,
        OrderCount: 0,
        ImageLink: ""
    }
    MenuItemObj.AddMenuItem(ItemToCreate, image);
}


//function to Get Sales and Number of orders from api
import { SalesObject } from './Objects/SalesObject.mjs';

let sales = new SalesObject();

sales.getTotalSales().then(data => {
  let totalSalesElement = document.getElementById("total-sales");
  totalSalesElement.textContent = `Total Sales: ${JSON.stringify(data)}`;
}).catch(error => {
  console.log(error);
});
