'use strict';


//imports
import { Accounts } from './Objects/ObjectExports.mjs';


// create instances of account objects
let adminAccount = new Accounts.AdminAccount();
let employeeAccount = new Accounts.EmployeeAccount();




//Function to Create Account
async function AccountCreate(event) {
    event.preventDefault();
    
    let AccountInfo = {
        _id: "",
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        emailAddress: document.getElementById('emailAddress').value,
        password: document.getElementById('password').value
    };


    const role = document.getElementById('role').value;
    const confirmPassword =  document.getElementById('confirmPassword').value;
    const adminPassword = document.getElementById('adminPassword').value;

    // Validate the inputs
    if (AccountInfo.firstName.trim() === '' || AccountInfo.lastName.trim() === '' ||
        AccountInfo.phoneNumber.trim() === '' || AccountInfo.emailAddress.trim() === '' ||
        AccountInfo.password.trim() === '') {
        alert('Please fill out all fields.');
        return;
    }

    if (isNaN(AccountInfo.phoneNumber)) {
        alert('Please enter a valid phone number.');
        return;
    }

    if (AccountInfo.password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    if (role !== 'admin' && role !== 'employee') {
        alert('Invalid role.');
        return;
    }

    if (!isValidEmail(AccountInfo.emailAddress)) {
        alert('Please enter a valid email address.');
        return;
    }

    console.log(AccountInfo.password);
    console.log(confirmPassword);
    if (AccountInfo.password !== confirmPassword){
        alert('Passwords do not match');
        return;
    }
    


    if (role === 'admin' && adminPassword === 'DRJ2022') {
        await adminAccount.CreateAdmin(AccountInfo);
        console.log('Success! Admin Created');
        alert('Success! Admin Created');
        window.location.replace("../public/login.html");


    } else if (role === 'employee') {
        await employeeAccount.CreateEmployee(AccountInfo);
        console.log('Success! Employee Created');
        alert('Success! Employee Created');
        window.location.replace("../public/login.html");
    }
}

//function for validating email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


// Add event listener to the "Create Account" button
document.getElementById('createAccountBtn').addEventListener('click', (event) => AccountCreate(event))






