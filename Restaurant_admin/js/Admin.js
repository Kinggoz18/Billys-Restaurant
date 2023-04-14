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

//HTML Variables
const CreatMenuBtn = document.getElementById('createMenuBTN');
const AddMenuItem = document.getElementById('AddMenuItemBTN');
const DeleteMenuBtn = document.getElementById('DeleteMenuBTN');

// Global Event Listeners
document.getElementById('Delete-btn').addEventListener('click',(event) => deleteUser(event));
document.getElementById('saveBtn').addEventListener('click', (event) => updateUser(event));
document.getElementById('logout-btn').addEventListener('click', (event) => logout(event));
document.getElementById('AddPromoBTN').addEventListener('click', (event) => addpromo(event));
//Event Listener to create a menu
CreatMenuBtn.addEventListener('click', CreateMenu);
//Event Listener to Add a menu
AddMenuItem.addEventListener('click', AddItem);
//Event Listener to delete a menu
DeleteMenuBtn.addEventListener('click', DeleteMenu);
//Event listner for .....
document.getElementById("Profile").addEventListener("submit", function (event) {
  event.preventDefault();
  checkPassword();
});



// ******************************** Menu Functions ********************************************* //
let menuList = document.getElementById('MenuItemMenu');
let MenuData = await MenuObj.GetAllMenu();
if(MenuData!=null){
  let current = "<option value=0>Select Item Menu</option>";
  MenuData.forEach(element => {
    let name = element['name'];
    current += `<option value=${name}>${name}</option>`
  });
  menuList.innerHTML = current;
}

//Function to Add a menu
async function CreateMenu() {
  let menuName = document.getElementById('MenuName').value;
  if (menuName === "" || menuName.length === 0 || menuName === null) {
    console.log('Throw error here! No Menu Selected');
    return;
  }
  else {
    await MenuObj.AddMenu(menuName).then(() => {
      console.log('Throw Success here! Menu Created');
      window.location.reload();
    });

  }
}
//Function to delete a menu
async function DeleteMenu() {
  let menuName = document.getElementById('MenuName').value;
  if (menuName === "" || menuName.length === 0 || menuName === null) {
    console.log('Throw error here! No Menu Selected');
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

// ******************************** User Functions ********************************************* //
async function updateUser(event) {
  event.preventDefault();

// Check if the user is logged in
let userInfo = localStorage.getItem('userInfo');
if (!userInfo) {
  alert('Please log in to update your account.');
  return;
}

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
    let userRole = localStorage.getItem('userRole');
    let adminId = "";
    if (userRole === 'admin') {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      adminId = userInfo._id;
    }

    // Update the admin account
    if (adminId !== "") {
      await adminAccount.UpdateAdmin(adminId, AccountInfo).then(() => {
        console.log('Success! Admin Updated');
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

  // Check if the user is logged in
  let userInfo = localStorage.getItem('userInfo');
  if (!userInfo) {
    alert('Please log in to delete your account.');
    window.location.replace("../public/login.html");
    return;
  }

  // Get the admin ID from local storage
  let userRole = localStorage.getItem('userRole');
  let adminId = "";
  if (userRole === 'admin') {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    adminId = userInfo._id;
  }

  // Delete the Admin account
  if (adminId !== "") {
    await adminAccount.DeleteAdmin(adminId).then(() => {
      console.log('Success! Admin Deleted');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userRole');
      alert('Success! Admin Deleted');
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
  let userInfo = localStorage.getItem('userInfo');
  if (!userInfo) {
    alert('Please log in to log out.');
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
  console.log("Promo has been added");
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

  // check if the promo was deleted successfully
  if (result) {
    console.log('Promo deleted successfully');
    alert('Promo deleted successfully');
    window.location.reload();
  } else {
    console.log('Error deleting promo');
    alert('Error deleting promo');
  }
}

// add an event listener to the Delete Promo button
document.getElementById('DeletePromoBTN').addEventListener('click', deletePromo);



// Get the user ID from local storage
let userRole = localStorage.getItem('userRole');
let userId = "";
if (userRole === 'admin') {
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
  userId = userInfo._id;
}

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
