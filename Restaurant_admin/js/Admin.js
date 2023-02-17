'use strict'
//imports
import {Menu, MenuItem} from './Objects/ObjectExports.mjs'

//Global variables
let MenuObj = new Menu.MenuObject();
let MenuItemObj = new MenuItem.MenuItemObject();


window.addEventListener("DOMContentLoaded", async ()=>{
    let CreatMenuBtn = document.getElementById('createMenuBTN')
    //Event listner for .....
    document.getElementById("Profile").addEventListener("submit", function(event) {
        event.preventDefault();
        checkPassword();
    });

    //Populate the menu ItemList
    let menuList = document.getElementById('MenuItemMenu');
    let current
    await MenuObj.GetAllMenu().then((data)=>{
        let current = "<option value=0>Select Item Menu</option>";
        data.forEach(element => {
            let name = element['name'];
            current +=  `<option value=${name}>${name}</option>`
        });
        menuList.innerHTML = current;
    })
    //Event Listener to create a menu
    CreatMenuBtn.addEventListener('click', CreateMenu());
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
function CreateMenu(){
    let menuName = document.getElementById('MenuName');
    if(menuName === "" || menuName.length === 0 || menuName=== null){
        console.log('Throw error here');
        return;
    }
    else{
        MenuObj.AddMenu();
    }
}
