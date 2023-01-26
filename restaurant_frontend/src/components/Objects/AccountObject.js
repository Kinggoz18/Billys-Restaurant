'use strict';
import $ from 'jquery'

class Account{
    //Stores the login account Url : Private
    #LoginUrls = {
        Admin: "https://drumrockjerkapi.azure-api.net/Admin/LoginAdmin",
        Customer: "https://drumrockjerkapi.azure-api.net/Customer/LoginCustomer",
        Employee: "https://drumrockjerkapi.azure-api.net/Employee/LoginEmployee",
    };
    //Stores the create account Url : Private
    #CreateUrls ={
        Admin: "https://drumrockjerkapi.azure-api.net/Admin/CreateAdmin",
        Customer:"https://drumrockjerkapi.azure-api.net/Customer/CreateCustomer",
        Employee: "https://drumrockjerkapi.azure-api.net/Employee/CreateEmployee",
    };
    //Stores the delete account Url : Private
    #DeleteUrls ={
        Admin: "https://drumrockjerkapi.azure-api.net/Admin/DeleteAdmin",
        Customer:"https://drumrockjerkapi.azure-api.net/Customer/DeleteCustomer",
        Employee: "https://drumrockjerkapi.azure-api.net/Employee/DeleteEmployee",
    };
    //Stores the update account Url : Private
    #UpdateUrls ={
        Admin: "https://drumrockjerkapi.azure-api.net/Admin/UpdateAdmin",
        Customer:"https://drumrockjerkapi.azure-api.net/Customer/UpdateCustomer",
        Employee: "https://drumrockjerkapi.azure-api.net/Employee/UpdateEmployee",
    };
    //Gets the correct GetUser Url : Private
    #GetUserUrl(AccountType, id) {
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

    // Function to Login an account : public
    LoginAccount(AccountType, LoginCredentials){
        $.ajax({
            url: this.#LoginUrls[AccountType],
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
     //Gets the Account information : public
    GetAccountInfro(AccountType, AccId){
        $.ajax({
            url: this.#GetUserUrl(AccountType, AccId),
            type: "GET",
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
    //Function to create an account : public
    CreateAccount(AccountType, AccId){
        let body = {id: AccId}
        $.ajax({
            url: this.#CreateUrls[AccountType],
            type: "POST",
            data: body,
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
    // Function to delete an account : public
    DeleteAccount(AccountType, AccId){
        let body = {id: AccId}
        $.ajax({
            url: this.#DeleteUrls[AccountType],
            type: "DELETE",
            data: body,
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
    //Function to Update an account details : public
    UpdateAccount(AccountType, AccId){
        let body = {id: AccId}
        $.ajax({
            url: this.#UpdateUrls[AccountType],
            type: "PUT",
            data: body,
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
}

export class AdminAccount extends Account{
    AccountInfo = null;
    constructor(){
        this.AccountInfo = {

        }
    }
}
export class EmployeeAccount extends Account{
    
}
export class CustomerAccount extends Account{

}