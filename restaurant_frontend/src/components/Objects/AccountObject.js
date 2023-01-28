//import {$} from "jquery";

export class Account{
    //Stores the login account Url : Private
    #LoginUrls = {
        Admin: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Admin/LoginAdmin",
        Customer: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Customer/LoginCustomer",
        Employee: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Employee/LoginEmployee",
    };
    //Stores the create account Url : Private
    #CreateUrls ={
        Admin: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Admin/CreateAdmin",
        Customer:"https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Customer/CreateCustomer",
        Employee: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Employee/CreateEmployee",
    };
    //Stores the delete account Url : Private
    #DeleteUrls ={
        Admin: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Admin/DeleteAdmin",
        Customer:"https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Customer/DeleteCustomer",
        Employee: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Employee/DeleteEmployee",
    };
    //Stores the update account Url : Private
    #UpdateUrls ={
        Admin: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Admin/UpdateAdmin",
        Customer:"https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Customer/UpdateCustomer",
        Employee: "https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Employee/UpdateEmployee",
    };
    //Gets the correct GetUser Url : Private
    #GetUserUrl(AccountType, id) {
        switch(AccountType){
            case "Admin": {
                return `https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Admin/GetAdmin/?id=${id}`;
            }
            case "Customer": {
                return `https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/Customer/GetCustomer/?id=${id}`;
            }
            case "Employee": {
                return `https://drumrockjerkapi.azure-api.netEmployee/GetEmployee/?id=${id}`;
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
            data: JSON.stringify(LoginCredentials),
            dataType: "json",
            contentType: "application/json",
            success: function(data){
                if(data == null){
                    return false;
                }
                else if(data.emailAddress === "string" && data.password === "string"){
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
    GetAccountInfo(AccountType, AccId){
        $.ajax({
            url: this.#GetUserUrl(AccountType, AccId),
            type: "GET",
            success: function(data){
                if(data == null){
                    return false;
                }
                else if(data.emailAddress === "string" && data.password === "string"){
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
    CreateAccount(AccountType, AccountToCreate){
        $.ajax({
            url: this.#CreateUrls[AccountType],
            type: "POST",
            data: JSON.stringify(AccountToCreate),
            dataType: "json",
            contentType: "application/json",
            success: function(data){
                if(data == null){
                    return false;
                }
                else if(data.emailAddress === "string" && data.password === "string"){
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
            data: JSON.stringify(body),
            dataType: "json",
            contentType: "application/json",
            success: function(data){
                if(data == null){
                    return false;
                }
                else if(data.emailAddress === "string" && data.password === "string"){
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
            data: JSON.stringify(body),
            dataType: "json",
            contentType: "application/json",
            success: function(data){
                if(data == null){
                    return false;
                }
                else if(data.emailAddress === "string" && data.password === "string"){
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
    #AccountInfo = null;
    //Defualt constructor
    constructor(){
        super();
        //Initialize Account Info object
        this.#AccountInfo = {
            _id: null,
            FirstName: null,
            LastName: null,
            PhoneNumber: null,
            EmailAddress: null,
            Password: null
        }
    }
    //Logins in the admin
    AdminLogin(LoginCredentials){
        let result = this.LoginAccount("Admin", LoginCredentials);
        if(result!==false)
        {
            this.#AccountInfo = result;
        }
        return result;
    }
    //Gets the Admin information
    get GetAdminInfo(){
        return this.#AccountInfo;
    }
    //Updates an Admin Account
    UpdateAdmin(id){
        return this.UpdateAccount("Admin", id);
    }
    //Deletes an Admin Account
    DeleteAdmin(id){
        return this.DeleteAccount("Admin", id);
    }
    CreateAdmin(AccountToCreate){
        return this.CreateAccount("Admin", AccountToCreate);
    }
}
export class EmployeeAccount extends Account{
    #AccountInfo = null;

    //Defualt constructor
    constructor(){
        super();
        //Initialize Account Info object
        this.#AccountInfo = {
            _id: null,
            FirstName: null,
            LastName: null,
            PhoneNumber: null,
            EmailAddress: null,
            Password: null
        }
    }
    //Logins in the Employee
    EmployeeLogin(LoginCredentials){
        let result =  this.LoginAccount("Employee", LoginCredentials);
        if(result!==false)
        {
            this.#AccountInfo = result;
        }
        return result;
    }
    //Gets the Employee information
    get GetEmployeeInfo(){
        return this.#AccountInfo;
    }
    //Updates an Admin Account
    UpdateEmployee(id){
        return this.UpdateAccount("Employee", id);
    }
    //Deletes an Admin Account
    DeleteEmployee(id){
        return this.DeleteAccount("Employee", id);
    }
    //Creates an Employee account
    CreateEmployee(AccountToCreate){
        return this.CreateAccount("Employee", AccountToCreate);
    }
}
export class CustomerAccount extends Account{
    #AccountInfo = null;
    //Defualt constructor
    constructor(){
        super();
        //Initialize Account Info object
        this.#AccountInfo = {
            _id: null,
            FirstName: null,
            LastName: null,
            PhoneNumber: null,
            EmailAddress: null,
            Password: null,
            Points: null,
            Reviews: null,
            PastOrders: null
        }
    }
    //Logins in the Customer
    CustomerLogin(LoginCredentials){
        let result = this.LoginAccount("Customer", LoginCredentials);
        if(result!==false)
        {
            this.#AccountInfo = result;
        }
        return result;
    }
    //Gets the Customer information
    get GetCustomerInfo(){
       return this.#AccountInfo;
    }
    //Updates an Customer Account
    UpdateCustomer(id){
        return this.UpdateAccount("Customer", id);
    }
    //Deletes an Customer Account
    DeleteCustomer(id){
        return this.DeleteAccount("Customer", id);
    }
    //Creates a Customer account
    CreateCustomer(AccountToCreate){
        return this.CreateAccount("Customer", AccountToCreate);
    }
}
