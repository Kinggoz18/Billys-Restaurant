'use strict';

//imports
import { Accounts } from './Objects/ObjectExports.mjs';

let employeeAccount = new Accounts.EmployeeAccount();
let AccountData = LoadAccountData();

//Load the account data into the placeholders
document.getElementById('firstName').placeholder = AccountData['firstName'];
document.getElementById('lastName').placeholder = AccountData['lastName'];
document.getElementById('phoneNumber').placeholder = AccountData['phoneNumber'];
document.getElementById('emailAddress').placeholder = AccountData['emailAddress'];

async function updateUser(event) {
  event.preventDefault();
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
    let employeeId = AccountData['_id'];

    // Update the employee account
    if (employeeId !== "") {
      await employeeAccount.UpdateEmployee(employeeId, AccountInfo).then(() => {
        console.log('Success! Employee Updated');
        let result = employeeAccount.GetEmployeeInfo;
        if (result != null) {
          alert('Success! Employee Updated');
          AddToStorage("AccountData", result);
          window.location.reload()
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

async function deleteUser(event){
  event.preventDefault();

  // Get the employee ID from local storage
  let employeeId = AccountData['_id'];

  // Delete the employee account
  if (employeeId !== "") {
    await employeeAccount.DeleteEmployee(employeeId).then(() => {
      console.log('Success! Employee Deleted');
      alert('Success! Employee Deleted');
      RemoveFromStorage("AccountData");
      window.location.href = 'login.html';
    }).catch((error) => {
      console.log('Error deleting employee:', error);
      alert('Employee not deleted');
    });
  }
}

async function logout(){
  // Check if the user is logged in
  let userInfo = localStorage.getItem('userInfo');
  if (!userInfo) {
    alert('Please log in to log out.');
    return;
  }

  // Get the user's role
  let userRole = localStorage.getItem('userRole');

  // Call the appropriate logout method based on the user's role
  if (userRole === 'employee') {
    console.log('Success! Employee Logged Out');
  }

  // Remove user info from local storage and redirect to login page
  localStorage.removeItem('userInfo');
  localStorage.removeItem('userRole');
  window.location.href = 'login.html';
}



// Add event listener to the "Save" and "Delete" button
document.getElementById('Delete-btn').addEventListener('click',(event) => deleteUser(event));
document.getElementById('saveBtn').addEventListener('click', (event) => updateUser(event));
document.getElementById('logout-btn').addEventListener('click', (event) => logout(event));

import { OrderObject } from './Objects/OrderObject.mjs';

let order = new OrderObject();

order.GetAllOrders().then(data => {
  let orderList = document.getElementById("emp-total-order");
  for(let i =0; i < data.length; i++){
    if(i == 15){
      console.log("STOP");
    }
    let order = data[i];
    let orderItem = document.createElement("li");
    let itemString = "";
    order.items.forEach(item => {
      itemString += `<div>Name: ${item.name}</div><div>Price: $${item.price.toFixed(2)}</div><div>Quantity: ${item.orderCount}</div>`;
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
  }

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

//Loads account data
function LoadAccountData(){
  return JSON.parse(GetFromStorage("AccountData"));
}

/* let idleTime = 0;
let timerId;

function resetTimer() {
  idleTime = 0;
}

function startTimer() {
  timerId = setInterval(function() {
    idleTime++;
    if (idleTime >= 300) {
      let count = 360 - idleTime;
      alert(`You have been idle for more than 5 minutes. You will be logged out in ${count} seconds if you remain inactive.`);
      if (idleTime === 360) {
        clearInterval(timerId);
        logout();
      }
    }
  }, 1000);
}

function activityDetected() {
  resetTimer();
}
document.addEventListener('mousemove', activityDetected);
document.addEventListener('keypress', activityDetected);

startTimer(); */
