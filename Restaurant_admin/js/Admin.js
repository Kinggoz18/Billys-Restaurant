'use strict'
//imports
import { Menu, MenuItem, Accounts } from './Objects/ObjectExports.mjs';

//Global variables
let MenuObj = new Menu.MenuObject();
let MenuItemObj = new MenuItem.MenuItemObject();
let AccObj = new Accounts.Account();


window.addEventListener("DOMContentLoaded", async () => {
  let CreatMenuBtn = document.getElementById('createMenuBTN');
  let AddMenuItem = document.getElementById('AddMenuItemBTN')
  //Event listner for .....
  document.getElementById("Profile").addEventListener("submit", function (event) {
    event.preventDefault();
    checkPassword();
  });

  //Populate the menu ItemList
  let menuList = document.getElementById('MenuItemMenu');
  await MenuObj.GetAllMenu().then((data) => {
    let current = "<option value=0>Select Item Menu</option>";
    data.forEach(element => {
      let name = element['name'];
      current += `<option value=${name}>${name}</option>`
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

/* async function AccountCreate() {
  let firstname = document.getElementById('first-name').value;
  let lastname = document.getElementById('last-name').value;
  let phone = document.getElementById('phone-number').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirm-password').value;
  let role = document.getElementById('role').value;
  let adminPassword = document.getElementById('adminPassword').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  if (role === 'admin'){
    await Accounts.CreateAdmin(firstname,lastname,phone, email, password).then(() => {
      console.log('Throw Success here! admin Created');
      window.location.reload();
    });

  }
} */
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

//function to Get Sales and Number of orders from api
import { SalesObject } from './Objects/SalesObject.mjs';

let sales = new SalesObject();

sales.getTotalSales().then(data => {
  let totalSalesElement = document.getElementById("total-sales");
  let formattedData = `Total Sales: $${data.getTotalSales.toFixed(2)}, Number of Orders: ${data.getNumberOfOrders}`;
  totalSalesElement.textContent = formattedData;
}).catch(error => {
  console.log(error);
});


import { OrderObject } from './Objects/OrderObject.mjs';

let order = new OrderObject();

order.GetAllOrders().then(data => {
  let orderList = document.getElementById("total-order");
  data.forEach(order => {
    let orderItem = document.createElement("li");
    let itemString = "";
    order.items.forEach(item => {
      itemString += `<li>Name: ${item.name}</li><li>Price: $${item.price.toFixed(2)}</li><li>Quantity: ${item.orderCount}</li>`;
    });
    orderItem.innerHTML = `
      <h3>Order ID: ${order._id}</h3>
      <ul>
        <li>Customer Name: ${order.customerName}</li>
        <li>Phone Number: ${order.phoneNumber}</li>
        <li>Email: ${order.customerEmail}</li>
        <li>Items:</li>
        <ul>
          ${itemString}
        </ul>
      </ul>`;
    orderList.appendChild(orderItem);
  });

  // Add search functionality
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
}).catch(error => {
  console.log(error);
});


