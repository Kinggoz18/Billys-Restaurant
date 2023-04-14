//imports
import { Accounts } from './Objects/ObjectExports.mjs';

// create instances of account objects
let adminAccount = new Accounts.AdminAccount();
let employeeAccount = new Accounts.EmployeeAccount();

async function LoginAccount(event) {
  event.preventDefault();

  let LoginInfo = {
    emailAddress: document.getElementById('emailAddress').value,
    password: document.getElementById('password').value,
  }
  let role = document.getElementById('role').value;
  if (!LoginInfo.emailAddress || !LoginInfo.password || !role) {
    alert('Please enter all required fields.');
    return;
  }

  try {
    if (role === 'admin') {
      await adminAccount.AdminLogin(LoginInfo).then(() => {
        let result = adminAccount.GetAdminInfo;
        if (result != null) {
          console.log('Success! Admin logged in');
          AddToStorage("AccountData", JSON.stringify(result));
          window.location.replace("../public/Admin.html");
        } else {
          alert('Account not found. Please check your email and password.');
        }
      });
    } else if (role === 'employee') {
      await employeeAccount.EmployeeLogin(LoginInfo).then(() => {
        let result = employeeAccount.GetEmployeeInfo;
        if (result != null) {
          console.log('Success! Employee logged in');
          AddToStorage("AccountData", JSON.stringify(result));
          window.location.replace("../public/Employee.html");
        } else {
          alert('Account not found. Please check your email and password.');
        }
      });
    }
  } catch (error) {
    console.error(error);
    alert('Error in logging in account. Please try again later.');
  };
}

// Add event listener to the "Create Account" button
document.getElementById('loginAccountBtn').addEventListener('click', (event) => LoginAccount(event));
