'use strict';

//imports
import { Accounts } from './Objects/ObjectExports.mjs';

// create instances of account objects
let adminAccount = new Accounts.AdminAccount();
let employeeAccount = new Accounts.EmployeeAccount();

  

//Function to Create Account
async function AccountCreate(event) {
    event.preventDefault();
    // Corrected property names in AccountInfo object
    let AccountInfo = {
        _id: "",
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        emailAddress: document.getElementById('emailAddress').value,
        password: document.getElementById('password').value
    };

    const role = document.getElementById('role').value;

        if (role === 'admin' && adminPassword === 'DRJ2022') {
            await adminAccount.CreateAdmin(AccountInfo);
            console.log('Success! Admin Created');
            //window.location.replace("../public/Admin.html");

        } else if (role === 'employee') {
            await employeeAccount.CreateEmployee(AccountInfo);
            console.log('Success! Employee Created');
            //window.location.replace("../public/Employee.html");
        } 
}

// Add event listener to the "Create Account" button
document.getElementById('createAccountBtn').addEventListener('click', (event)=>AccountCreate(event))

