'use strict';
import $ from 'jquery'

class Account{
    //Stores the login account Url
    LoginUrls = {
        Admin: "https://drumrockjerkapi.azure-api.net/Admin/LoginAdmin",
        Customer: "https://drumrockjerkapi.azure-api.net/Customer/LoginCustomer",
        Employee: "https://drumrockjerkapi.azure-api.net/Employee/LoginEmployee",
    };
    //Stores the create account Url
    CreateUrls ={
        Admin: "https://drumrockjerkapi.azure-api.net/Admin/CreateAdmin",
        Customer:"https://drumrockjerkapi.azure-api.net/Customer/CreateCustomer",
        Employee: "https://drumrockjerkapi.azure-api.net/Employee/CreateEmployee",
    };
    //Stores the delete account Url
    DeleteUrls ={
        Admin: "https://drumrockjerkapi.azure-api.net/Admin/DeleteAdmin",
        Customer:"https://drumrockjerkapi.azure-api.net/Customer/DeleteCustomer",
        Employee: "https://drumrockjerkapi.azure-api.net/Employee/DeleteEmployee",
    };
    //Stores the update account Url
    UpdateUrls ={
        Admin: "https://drumrockjerkapi.azure-api.net/Admin/UpdateAdmin",
        Customer:"https://drumrockjerkapi.azure-api.net/Customer/UpdateCustomer",
        Employee: "https://drumrockjerkapi.azure-api.net/Employee/UpdateEmployee",
    };
    //Gets the correct GetUser Url
    GetUserUrl(AccountType, id) {
        switch(AccountType){
            case "Admin": {
                return `https://drumrockjerkapi.azure-api.net/Admin/GetAdmin?id=${id}`;
            }
            case "Customer": {
                return `https://drumrockjerkapi.azure-api.net/Customer/GetCustomer?id=${id}`;
            }
            case "Employee": {
                return `https://drumrockjerkapi.azure-api.netEmployee/GetEmployee?id=${id}`;
            }
            default:{
                break;
            }
        }
    }
    //Gets the Account information
    GetAccountInfro(AccountType, id){

    }
    //Creates An account
    CreateAccount(AccountType, LoginCredentials){
        $.ajax({
            url: this.CreateUrls[AccountType],
            type: "POST",
            data: LoginCredentials,
            success: function(data){
                        if(data.EmailAddress === "string" && data.Password === "string"){
                            return false;
                        }
                        else{
                            return data;
                        }
            },
            error: function(error){
            console.error(error)
            }
        });
    }
    //Logs in an account 
    LoginAccount(AccountType, LoginCredentials){
        $.ajax({
            url: this.LoginUrls[AccountType],
            type: "POST",
            data: LoginCredentials,
            success: function(data){
                        if(data.EmailAddress === "string" && data.Password === "string"){
                            return false;
                        }
                        else{
                            return data;
                        }
            },
            error: function(error){
            console.error(error)
            }
        });
    }
    //Deletes the account
    DeleteAccount(AccountType, LoginCredentials){

    }//Updates the account details
    UpdateAccount(AccountType, LoginCredentials){
        
    }
}