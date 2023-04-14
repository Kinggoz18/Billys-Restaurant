'use strict';

//imports
import { Accounts } from './Objects/ObjectExports.mjs';
import { SalesObject } from './Objects/SalesObject.mjs';
import { Menu, MenuItem} from './Objects/ObjectExports.mjs';
import { OrderObject } from './Objects/OrderObject.mjs';
import { Promo } from './Objects/ObjectExports.mjs';

//Global variables
let MenuObj = new Menu.MenuObject();
let order = new OrderObject();
let MenuItemObj = new MenuItem.MenuItemObject();
let AccObj = new Accounts.Account();
let adminAccount = new Accounts.AdminAccount();
let sales = new SalesObject();
let adminpromo = new Promo.PromoObject();
let AccountData = LoadAccountData();
//Load the account data into the placeholders
document.getElementById('firstName').placeholder = AccountData['firstName'];
document.getElementById('lastName').placeholder = AccountData['lastName'];
document.getElementById('phoneNumber').placeholder = AccountData['phoneNumber'];
document.getElementById('emailAddress').placeholder = AccountData['emailAddress'];

//HTML Variables
const CreatMenuBtn = document.getElementById('createMenuBTN');
const AddMenuItem = document.getElementById('AddMenuItemBTN');
const DeleteMenuBtn = document.getElementById('DeleteMenuBTN');
let DeleteMenuItemBTN = document.getElementById('DeleteMenuItemBTN');

// Global Event Listeners
document.getElementById('Delete-btn').addEventListener('click',(event) => deleteUser(event));
document.getElementById('saveBtn').addEventListener('click', (event) => updateUser(event));
document.getElementById('logout-btn').addEventListener('click', (event) => logout(event));
document.getElementById('AddPromoBTN').addEventListener('click', (event) => addpromo(event));

//Event Listener to create a menu
CreatMenuBtn.addEventListener('click', (event)=>CreateMenu(event));
//Event Listener to Add a menu
AddMenuItem.addEventListener('click', AddItem);
//Event Listener to delete a menu
DeleteMenuBtn.addEventListener('click', (event)=>DeleteMenu(event));
//Event Listener to delete a menu item
DeleteMenuItemBTN.addEventListener('click', (event)=>DeleteMenuItem(event));
//Event listner for .....
document.getElementById("Profile").addEventListener("submit", function (event) {
  event.preventDefault();
  checkPassword();
});



// ******************************** Menu Functions ********************************************* //
let menuList = document.querySelectorAll('.MenuItemMenu');
let MenuData = await MenuObj.GetAllMenu();
let MenuItemList = document.querySelector('.MenuItemSelect');
//Populate the menu lists
if (MenuData != null) {
  let current = "<option value='0'>Select a Menu</option>";
  MenuData.forEach(element => {
    let name = element.name;
    current += `<option value='${name}'>${name}</option>`;
  });

  menuList.forEach(list => {
    list.innerHTML = current;
  });
}

//populate the menu item lists
if(MenuData !== null){
  let current = "<option value='0'>Select menu item to remove</option>";
  MenuData.forEach(element => {
    element['foodList'].forEach(x=>{
      let name = x.name;
      let id = x._id
      current += `<option value='${name}' data-id="${id}">${name}</option>`;
    })
  });
  MenuItemList.innerHTML = current;
}
//Function to Add a menu
async function CreateMenu(event) {
  event.preventDefault();
  let menuName = document.getElementById('MenuName').value;
  if (menuName === "" || menuName.length === 0 || menuName === null) {
    alert('No Menu Selected');
    return;
  }
  else {
    await MenuObj.AddMenu(menuName).then(() => {
      alert('Menu Created!');
      window.location.reload();
    });

  }
}
//Function to delete a menu
async function DeleteMenu(event) {
  event.preventDefault();
  let menuName = document.getElementById('MenuName').value;
  if (menuName === "" || menuName.length === 0 || menuName === null) {
   console.log ('Throw error here! No Menu Selected');
    return;
  }
  else {
    await MenuObj.DeleteMenu(menuName).then(() => {
      console.log('Throw Success here! Menu Deleted');
      window.location.reload();
    });

  }
}
//Function to Add a menu item
async function AddItem() {
  let name = document.getElementById('MenuItemName').value;
  let price = document.getElementById('MenuItemPrice').value;
  let menu = document.getElementById('MenuItemMenu').value;
  let image = document.getElementById('MenuItemImage').files[0];;
  if (name === '') {
    console.log('Name not selected. Throwing Error!');
    return;
  }
  if (price === '') {
    console.log('Price not selected. Throwing Error!');
    return;
  }
  if (menu == 0) {
    console.log('Menu not selected. Throwing Error!');
    return;
  }
  if (image === "" || image === null) {
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
//Function to delete a menu item
async function DeleteMenuItem(event){
  event.preventDefault();
  let select = event.target.previousElementSibling;
  let target = select.options[select.selectedIndex];
  let id = target.dataset.id;;
  let result = await MenuItemObj.DeleteMenuItem(id);
  
  if(result!=true){
    console.log("An error occured!");
  }else{
    window.location.reload();
  }
}
// ******************************** User Functions ********************************************* //
async function updateUser(event) {
  event.preventDefault();

  // Get the password value
  let password = document.getElementById('password').value;

  // If password field is not empty, update the admin account
  if (password !== "") {
    let AccountInfo = {
      _id: "",
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      emailAddress: document.getElementById('emailAddress').value,
      password: password
    }

    // Get the admin ID from local storage
    let adminId = AccountData['_id'];

    // Update the admin account
    if (adminId !== "") {
      await adminAccount.UpdateAdmin(adminId, AccountInfo).then(() => {
        let result = adminAccount.GetAdminInfo;
        if (result != null) {
          alert('Success! Admin Updated');
        } else {
          alert('admin not updated');
        }
      }).catch((error) => {
        console.log('Error updating admin:', error);
        alert('Admin not updated');
      });
    }
  }
}
async function deleteUser(event){
  event.preventDefault();
  let adminId = AccountData['_id'];
  // Delete the Admin account
  if (adminId !== "" || adminId !== null) {
    await adminAccount.DeleteAdmin(adminId).then(() => {   

      alert('Success! Admin Deleted');
      RemoveFromStorage('AccountData');
      window.location.replace("../public/login.html");

    }).catch((error) => {
      console.log('Error deleting Admin:', error);
      alert('Admin not deleted');
    });
  }
}
//Function to logout
function logout(){
  // Check if the user is logged in
  if (!IsInStorage("AccountData")) {
    alert('Please log in to log out.');
    return;
  }
  else{
    // Remove user info from local storage and redirect to login page
    RemoveFromStorage("AccountData");
    window.location.href = 'login.html';
  }
}

// ******************************** Sales Functions ********************************************* //
sales.getTotalSales().then(data => {
  let totalSalesElement = document.getElementById("total-sales");
  let formattedData = `Total Sales: $${data.getTotalSales.toFixed(2)}, Number of Orders: ${data.getNumberOfOrders}`;
  totalSalesElement.textContent = formattedData;
}).catch(error => {
  console.log(error);
});

// ******************************** Order Functions ********************************************* //
order.GetAllOrders().then(data => {
    // Sort orders by createdAt in descending order
    data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    let orderList = document.getElementById("total-order");
    let count = 0; // Counter variable
    data.forEach(order => {
      if (count >= 10) return; // Stop loop after 10 orders
      count++;

      let orderItem = document.createElement("li");
      let itemString = "";
      order.items.forEach(item => {
        itemString += `<div>Name: ${item.name}</div><div>Price: $${item.price.toFixed(2)}</div><div>Quantity: ${item.orderCount}</div>`;
      });
      orderItem.innerHTML = `
        <h3>Order ID: ${order._id}</h3>
        <div>
          <div>Customer Name: ${order.customerName}</div>
          <div>Phone Number: ${order.phoneNumber}</div>
          <div>Email: ${order.customerEmail}</div>
          <div>Items:</div>
          <div>
            ${itemString}
          </div>
        </div>`;
      orderList.appendChild(orderItem);
    });

    // Add search functionality for Order ID
    let searchBox = document.getElementById("search-box");
    searchBox.addEventListener("keyup", function () {
      let query = searchBox.value.toLowerCase();
      orderList.childNodes.forEach(orderItem => {
        let orderID = orderItem.querySelector("h3").textContent;
        if (orderID.toLowerCase().includes(query)) {
          orderItem.style.display = "block";
        } else {
          orderItem.style.display = "none";
        }
      });
    });

    // Add search functionality for Customer Name
    let searchBox2 = document.getElementById("search-box2");
    searchBox2.addEventListener("keyup", function () {
      let query = searchBox2.value.toLowerCase();
      orderList.childNodes.forEach(orderItem => {
        let customerName = orderItem.querySelector("li:nth-child(1)").textContent;
        if (customerName.toLowerCase().includes(query)) {
          orderItem.style.display = "block";
        } else {
          orderItem.style.display = "none";
        }
      });
    });
  })
  .catch(error => {
    console.log(error);
  });

  async function logout(){
    // Check if the user is logged in
    let userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      alert('Please log in to log out.');
      window.location.href = 'login.html';
      return;
    }
  
    // Get the user's role
    let userRole = localStorage.getItem('userRole');
  
    // Call the appropriate logout method based on the user's role
    if (userRole === 'admin') {
      console.log('Success! Admin Logged Out');
    }
  
    // Remove user info from local storage and redirect to login page
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
  }
  document.getElementById('logout-btn').addEventListener('click', (event) => logout(event));

import { Promo } from './Objects/ObjectExports.mjs';


// Function to add promo
async function addpromo(event){
  event.preventDefault();

  //getting data enter by the user from the html
  let promoinfo = {
    promoString : document.getElementById('promoString').value,
    promoDiscount : document.getElementById('promoDiscount').value
  }

  //calling create promo method
  await adminpromo.CreatePromo(promoinfo);
  alert("Promo has been added");
  window.location.reload();
}

//event listener for when addpromo button is clicked
document.getElementById('AddPromoBTN').addEventListener('click', (event) => addpromo(event));


// define a function to handle the deletion of a promo
async function deletePromo(event) {
  event.preventDefault();

  // get the promo code from the input field
  const promoCode = document.getElementById('deletePromo').value;
  // call the DeletePromo method on the PromoObject
  const result = await adminpromo.DeletePromo(promoCode);

  if (isDeleted) {
    console.log("Promo deleted successfully!");
    alert("Promo deleted successfully!");
    window.location.reload();
  } else {
    console.log('Error deleting promo');
    alert('Error deleting promo');
  }
}

// add an event listener to the Delete Promo button
document.getElementById('DeletePromoBTN').addEventListener('click', deletePromo);



// Get the user ID from local storage
let userId = AccountData['_id'];
// Get all promos
adminpromo.GetAllPromos(userId).then(promos => {
  // Display all promos in the HTML
  let promoContainer = document.getElementById('promo-container');
  if (promos.length > 0) {
    let promoList = document.createElement('ul');
    for (let promo of promos) {
      let promoItem = document.createElement('li');
      promoItem.textContent = promo.promoString + ' - ' + promo.promoDiscount;
      promoList.appendChild(promoItem);
    }
    promoContainer.appendChild(promoList);
  } else {
    promoContainer.textContent = 'No promos found.';
  }
});
//Loads account data
function LoadAccountData(){
  return JSON.parse(GetFromStorage("AccountData"));
}