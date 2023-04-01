 /*======================================================================
| AccountObject
|
| Name: AccountObject.js
|
| Written by: Chigozie Muonagolu - Febuary 2023
|
| Purpose: Communicate with the backend/API.
|
| usage: used in services that requires it.
|
| Description of properties: None
|
|------------------------------------------------------------------
*/
export class Account{
    //Stores the login account Url : Private
    #LoginUrls = {
        Admin: "http://chigozie107-001-site1.itempurl.com/Admin/LoginAdmin",
        Customer: "http://chigozie107-001-site1.itempurl.com/Customer/LoginCustomer",
        Employee: "http://chigozie107-001-site1.itempurl.com/Employee/LoginEmployee",
    };
    //Stores the create account Url : Private
    #CreateUrls ={
        Admin: "http://chigozie107-001-site1.itempurl.com/Admin/CreateAdmin",
        Customer:"http://chigozie107-001-site1.itempurl.com/Customer/CreateCustomer",
        Employee: "http://chigozie107-001-site1.itempurl.com/Employee/CreateEmployee",
    };
    //Stores the delete account Url : Private
    #DeleteUrls ={
        Admin: "http://chigozie107-001-site1.itempurl.com/Admin/DeleteAdmin",
        Customer:"http://chigozie107-001-site1.itempurl.com/Customer/DeleteCustomer",
        Employee: "http://chigozie107-001-site1.itempurl.com/Employee/DeleteEmployee",
    };
    //Stores the update account Url : Private
    #UpdateUrls ={
        Admin: "http://chigozie107-001-site1.itempurl.com/Admin/UpdateAdmin",
        Customer:"http://chigozie107-001-site1.itempurl.com/Customer/UpdateCustomer",
        Employee: "http://chigozie107-001-site1.itempurl.com/Employee/UpdateEmployee",
    };
    //Gets the correct GetUser Url : Private
    #GetUserUrl(AccountType, id) {
        const params = new URLSearchParams();
        params.append("AdminId", id);
        switch(AccountType){
            case "Admin": {
                return `http://chigozie107-001-site1.itempurl.com/Admin/GetAdmin?${params}`;
            }
            case "Customer": {
                return `http://chigozie107-001-site1.itempurl.com/Customer/GetCustomer?${params}`;
            }
            case "Employee": {
                return `http://chigozie107-001-site1.itempurl.com/Employee/GetEmployee?${params}`;
            }
            default:{
                break;
            }
        }
    }

    //Gets the correct GetUser Url : Private
    #GetAllAccountUrl(AccountType, id) {
        const params = new URLSearchParams();
        params.append("AdminId", id);
        switch(AccountType){
            case "Admin": {
                return `http://chigozie107-001-site1.itempurl.com/Admin/GetAllAdmin/${id}`;
            }
            case "Customer": {
                return `http://chigozie107-001-site1.itempurl.com/Customer/GetAllCustomer/${id}`;
            }
            case "Employee": {
                return `http://chigozie107-001-site1.itempurl.com/Employee/GetAllEmployee/${id}`;
            }
            default:{
                break;
            }
        }
    }

    // Function to Login an account : public
    async LoginAccount(AccountType, LoginCredentials){
        let dataToReturn = null;
        try{
            await fetch(this.#LoginUrls[AccountType], {
                method: "POST",
                body: JSON.stringify(LoginCredentials),
                headers: { "Content-Type": "application/json" }
            }).then((response)=>{
                if(response.status!=200){
                    console.log(response.statusText);
                    return null
                }
                return response.json();
            }).then((data)=>{
                if (data == null) {
                    return false;
                } else if (data.emailAddress === "string" && data.password === "string") {
                    return false;
                }
                dataToReturn = data;
            })
        }catch(error){
            console.log(error);
            return null
        }
        return dataToReturn;
    }
     //Gets the Account information : public
    async GetAccountInfo(AccountType, AccId){
        let dataToReturn = null;
        try{
            await fetch(this.#GetUserUrl(AccountType, AccId), {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response)=>{
                if(response.status!=200){
                    console.log(response.statusText);
                    return null
                }
                return response.json();
            }).then((data)=>{
                if (data == null) {
                    return false;
                } else if (data.emailAddress === "string" && data.password === "string") {
                    return false;
                }
                dataToReturn = data;
            })
        }catch(error){
            console.log(error);
        }
        return dataToReturn;
    }
    //Gets all the data in the collection 
    // Function to delete an account : public
    async GetAllAccount(AccountType, AccId){
        let dataToReturn = null;
        try{
            await fetch(`${this.#GetAllAccountUrl(AccountType, AccId)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }).then((response)=>{
                if(response.status!=200){
                    console.log(response.statusText);
                    return null
                }
                return response.json();
            }).then((data)=>{
                if (data == null) {
                    return false;
                } else if (data.emailAddress === "string" && data.password === "string") {
                    return false;
                }
                dataToReturn = data;
            })
        }catch(error){
            console.log(error);
        }
        return dataToReturn;
    }
    //Function to create an account : public
    async CreateAccount(AccountType, AccountToCreate) {
        let dataToReturn = null;
        try {
            await fetch(this.#CreateUrls[AccountType], {
                method: "POST",
                body: JSON.stringify(AccountToCreate),
                headers: { "Content-Type": "application/json" }
            }).then((response)=>{
                if(response.status!=200){
                    console.log(response.statusText);
                    return null
                }
                return response.json();
            }).then((data)=>{
                if (data == null) {
                    return false;
                } else if (data.emailAddress === "string" && data.password === "string") {
                    return false;
                }
                dataToReturn = data;
            })
        } catch (error) {
            console.error(error);
            return null;
        }
        return dataToReturn;
    }
    // Function to delete an account : public
    async DeleteAccount(AccountType, AccId){
        let dataToReturn = null;
        try{
            const apiUrl = this.#DeleteUrls[AccountType];
            const params = new URLSearchParams();
            params.append("id", AccId);
            await fetch(`${apiUrl}?${params}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            }).then((response)=>{
                if(response.status!=200){
                    console.log(response.statusText);
                    return null
                }
                return true;
            }).then((data)=>{
                dataToReturn = data;
            })
        }catch(error){
            console.log(error);
        }
        return dataToReturn;
    }
    //Function to Update an account details : public
    async UpdateAccount(AccountType, accountoUpdate_ID, AccountInfo){
       let dataToReturn = null;
       let accountInfo = JSON.stringify(AccountInfo);
       try{
        const apiUrl = this.#UpdateUrls[AccountType];
        const params = new URLSearchParams();
        params.set("AccountoUpdate_ID", accountoUpdate_ID);
            await fetch(`${apiUrl}?${params}`, {
                method: "PUT",
                body: accountInfo,
                headers: { "Content-Type": "application/json" }
            }).then((response)=>{
                if(response.status!=200){
                    console.log(response.statusText);
                    return null
                }
                return response.json();
            }).then((data)=>{
                if (data == null) {
                    return false;
                } else if (data.emailAddress === "string" && data.password === "string") {
                    return false;
                }
                dataToReturn = data;
            })
       }catch(error){
        console.log(error);
       }
       return dataToReturn;
    }
}
export class AdminAccount extends Account{
    #AccountInfo = null;
    //Default constructor
    constructor(){
        super();
        //Initialize Account Info object
        this.#AccountInfo = {
            _id:  "",
            FirstName: null,
            LastName: null,
            PhoneNumber: null,
            EmailAddress: null,
            Password: null
        }
    }
    //Logins in the admin
    async AdminLogin(LoginCredentials){
        let result = await this.LoginAccount("Admin", LoginCredentials);
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
    //Gets all the admin accounts
    async GetAllAdmin(id){
        let AllAccount;
        await this.GetAllAccount("Admin", id).then((data)=>{
            AllAccount = data;
        });
        return AllAccount;
    }
    //Updates an Admin Account
    async UpdateAdmin(AdminToUpdate_ID, AccountInfo){
        await this.UpdateAccount("Admin", AdminToUpdate_ID, AccountInfo).then((data)=>{
            this.#AccountInfo = (data == false)? this.#AccountInfo : data;
        });
    }
    //Deletes an Admin Account
    async DeleteAdmin(id){
        await this.DeleteAccount("Admin", id).then(()=>{
            this.#AccountInfo = null;
        });
    }
    //Creates an Admin Account
    async CreateAdmin(AccountToCreate){
        await this.CreateAccount("Admin", AccountToCreate).then((data)=>{
            this.#AccountInfo = data;
        });
    }
}
export class EmployeeAccount extends Account{
    #AccountInfo = null;

    //Default constructor
    constructor(){
        super();
        //Initialize Account Info object
        this.#AccountInfo = {
            _id:  "",
            FirstName: null,
            LastName: null,
            PhoneNumber: null,
            EmailAddress: null,
            Password: null
        }
    }
    //Logins in the Employee
    async EmployeeLogin(LoginCredentials){
        let result =  await this.LoginAccount("Employee", LoginCredentials);
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
    //Gets all the Employee accounts
    async GetAllEmployee(id){
        let dataToReturn;
        await this.GetAllAccount("Employee", id).then((data)=>{
            dataToReturn = data;
        });
        return dataToReturn;
    }
    //Updates an Admin Account
    async UpdateEmployee(id, AccountInfo){
        await this.UpdateAccount("Employee", id, AccountInfo).then((data)=>{
            this.#AccountInfo = (data == false)? this.#AccountInfo : data;
        });
    }
    //Deletes an Admin Account
    async DeleteEmployee(id){
        await this.DeleteAccount("Employee", id);
        this.#AccountInfo = null;
    }
    //Creates an Employee account
    async CreateEmployee(AccountToCreate){
        await this.CreateAccount("Employee", AccountToCreate).then((data)=>{
            this.#AccountInfo = data;
        });
    }
}
export class CustomerAccount extends Account{
    #AccountInfo = null;
    //Default constructor
    constructor(){
        super();
        //Initialize Account Info object
        this.#AccountInfo = {
            _id:  "",
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
    async CustomerLogin(LoginCredentials){
        let result = await this.LoginAccount("Customer", LoginCredentials);
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
    //Gets all the Employee accounts
    async GetAllCustomer(id){
        let dataToReturn;
        await this.GetAllAccount("Customer", id).then((data)=>{
            dataToReturn = data;
        });
        return dataToReturn;
    }
    //Updates an Customer Account
    async UpdateCustomer(id, AccountInfo){
        await this.UpdateAccount("Customer", id, AccountInfo).then((data)=>{
            this.#AccountInfo = (data == false)? this.#AccountInfo : data;
        });
    }
    //Deletes an Customer Account
    async DeleteCustomer(id){
        await this.DeleteAccount("Customer", id);
        this.#AccountInfo = null;
    }
    //Creates a Customer account
    async CreateCustomer(AccountToCreate){
        await this.CreateAccount("Customer", AccountToCreate).then((data)=>{
            this.#AccountInfo = data;
        });
    }
    //Updates a customers points
    async UpdateCustomerPoint(id){
        let dataToReturn = null;
        try{
            const apiUrl = "http://chigozie107-001-site1.itempurl.com/Customer/UpdatePoint";
            const params = new URLSearchParams();
            params.append("id", id);
            await fetch(`${apiUrl}?${params}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            }).then((response)=>{
                if(response.status!=200){
                    console.log(response.statusText);
                    return null
                }
                return true;
            }).then((data)=>{
                dataToReturn = data;
            })
        }catch(error){
            console.log(error);
        }
        this.#AccountInfo = dataToReturn;
        return dataToReturn;
    }
    //Consumes customers points
    async UseCustomersPoints(id){
        let dataToReturn = null;
        try{
            const apiUrl = "http://chigozie107-001-site1.itempurl.com/Customer/ConsumePoint";
            const params = new URLSearchParams();
            params.append("id", id);
            await fetch(`${apiUrl}?${params}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            }).then((response)=>{
                if(response.status!=200){
                    console.log(response.statusText);
                    return null
                }
                return true;
            }).then((data)=>{
                dataToReturn = data;
            })
        }catch(error){
            console.log(error);
        }
        this.#AccountInfo = dataToReturn;
        return dataToReturn;
    }
}

