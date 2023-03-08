'use strict'
//imports
import { Accounts } from './Objects/ObjectExports.mjs';

// create instances of account objects
let adminAccount = new Accounts.AdminAccount();
let employeeAccount = new Accounts.EmployeeAccount();

//Function to Create Account
async function AccountCreate() {
    let AccountInfo = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        emailAddress: document.getElementById('emailAddress').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        role: document.getElementById('role').value,
        adminPassword: document.getElementById('adminPassword').value,
    }

    if (AccountInfo.password !== AccountInfo.confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    // validate inputs
    if (!firstName || !lastName || !phoneNumber || !emailAddress || !password) {
        alert('Please enter all required fields.');
        return;
    }

    if (role === 'admin' && adminPassword !== 'DRJ2022') {
        alert('Incorrect admin password!');
        return;
    }

    try {
        if (AccountInfo.role === 'admin' && AccountInfo.adminPassword === 'DRJ2022') {
            await adminAccount.CreateAdmin(AccountInfo);
            console.log('Success! Admin Created');
            window.location.replace("../public/Admin.html");
        }
        else if (AccountInfo.role === 'employee') {
            await employeeAccount.CreateEmployee(AccountInfo);
            console.log('Success! Employee Created');
            window.location.replace("../public/Employee.html");
        }
    } catch (error) {
        console.error(error);
        alert('Error creating account. Please try again later.');
    }
}



// Add event listener to the "Create Account" button
document.getElementById('createAccountBtn').addEventListener('click', AccountCreate)
