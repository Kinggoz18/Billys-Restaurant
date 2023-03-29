'use strict';

//imports
import { Accounts } from './Objects/ObjectExports.mjs';

let employeeAccount = new Accounts.EmployeeAccount();

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

  // If password field is not empty, update the employee account
  if (password !== "") {
    let AccountInfo = {
      _id: "",
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      phoneNumber: document.getElementById('phoneNumber').value,
      emailAddress: document.getElementById('emailAddress').value,
      password: password
    }

    // Get the employee ID from local storage
    let userRole = localStorage.getItem('userRole');
    let employeeId = "";
    if (userRole === 'employee') {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      employeeId = userInfo._id;
    }

    // Update the employee account
    if (employeeId !== "") {
      await employeeAccount.UpdateEmployee(employeeId, AccountInfo).then(() => {
        console.log('Success! Employee Updated');
        let result = employeeAccount.GetEmployeeInfo;
        if (result != null) {
          alert('Success! Employee Updated');
        } else {
          alert('Employee not updated');
        }
      }).catch((error) => {
        console.log('Error updating employee:', error);
        alert('Employee not updated');
      });
    }
  }
}

// Add event listener to the "Save" button
document.getElementById('saveBtn').addEventListener('click', (event) => updateUser(event));

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
      <h3>Customer Name: ${order.customerName}</h3>
      <ul>
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
      let customerName = orderItem.querySelector("h3").textContent;
      if (customerName.toLowerCase().includes(query)) {
        orderItem.style.display = "block";
      } else {
        orderItem.style.display = "none";
      }
    });
  });
}).catch(error => {
  console.log(error);
});

// Function to handle logout
function logout() {
  // Call the appropriate logout method based on the user's role
 if (userRole === 'employee') {
    employeeAccount.logout();
  }

  // Redirect the user to the login page
  window.location.href = 'login.html';
}

// Add event listener to logout button
document.getElementById('logout-btn').addEventListener('click', logout);
