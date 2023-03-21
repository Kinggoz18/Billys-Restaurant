//imports
import { Accounts } from './Objects/ObjectExports.mjs';

// create instances of account objects
let adminAccount = new Accounts.AdminAccount();
let employeeAccount = new Accounts.EmployeeAccount();

async function LoginAccount() {
    let LoginInfo = {
        emailAddress: document.getElementById('emailAddress').value,
        password: document.getElementById('password').value,
    }

    if (!LoginInfo.emailAddress || !LoginInfo.password) {
        alert('Please enter all required fields.');
        return;
    }

    let isAdmin = await adminAccount.AdminLogin(LoginInfo);
    if (isAdmin) {
        console.log('Success! Admin logged in');
        window.location.href = "../public/Admin.html";
    } else {
        let isEmployee = await employeeAccount.EmployeeLogin(LoginInfo);
        if (isEmployee) {
            console.log('Success! Employee logged in');
            window.location.href = "../public/Employee.html";
        } else {
            alert('Error in logging in account. Please try again later.');
        }
    }
}

// Add event listener to the "Create Account" button
document.getElementById('loginAccountBtn').addEventListener('click', LoginAccount);
