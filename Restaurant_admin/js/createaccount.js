'use strict';

//imports
import { Accounts } from './Objects/ObjectExports.mjs';

// create instances of account objects
let adminAccount = new Accounts.AdminAccount();
let employeeAccount = new Accounts.EmployeeAccount();



/* function ValidateCreate(AccountInfo) {
    // Validate phone number
    if (!/^\d{10}$/.test(AccountInfo.PhoneNumber)) {
        throw new Error('Please enter a valid phone number.');
    }

    // Validate email address
    if (!/^\S+@\S+\.\S+$/.test(AccountInfo.EmailAddress)) {
        throw new Error('Please enter a valid email address.');
    }

    // Validate password
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(AccountInfo.Password)) {
        throw new Error('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.');
    }
} */

/* function ValidateEmail(email){
    var mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail.test(email)) {
        return true;
    }
    else {
        return false;
    }
} */
  

//Function to Create Account
async function AccountCreate() {
    // Corrected property names in AccountInfo object
    let AccountInfo = {
        FirstName: document.getElementById('firstName').value,
        LastName: document.getElementById('lastName').value,
        PhoneNumber: document.getElementById('phoneNumber').value,
        EmailAddress: document.getElementById('emailAddress').value,
        Password: document.getElementById('password').value
    };

    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;
    const adminPassword = document.getElementById('adminPassword').value;

    if (AccountInfo.Password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }
  /*   if (!ValidateEmail(AccountInfo.EmailAddress)) {
        alert('Please enter a valid email address.');
        return;
      } */

    // Validate all properties in AccountInfo object
    /* if (FirstName || !LastName || PhoneNumber || !EmailAddress || !Password) {
        alert('Please enter all required fields.');
        return;
    } */

    if (role === 'admin' && adminPassword !== 'DRJ2022') {
        alert('Incorrect admin password!');
        return;
    }

    try {
      /*   if (!ValidateCreate(AccountInfo)) {
            return;
        } */
        if (role === 'admin' && adminPassword === 'DRJ2022') {
            await adminAccount.CreateAdmin(AccountInfo);
            console.log('Success! Admin Created');
            window.location.replace("../public/Admin.html");

        } else if (role === 'employee') {
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

