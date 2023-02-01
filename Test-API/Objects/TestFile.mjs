import {AdminAccount, EmployeeAccount, CustomerAccount} from './AccountObject.mjs';
let AccountToCreate = [];
let firstName = ["Aaran", "Aaren", "Aarez", "Aarman", "Aaron", "Aaron-James", "Aarron", "Aaryan", "Aaryn", "Eadie"]
let lastName = ["Duriel", "Dustin", "Dylan", "Dylan-Jack", "Dylan-James", "Dylan-John", "Dylan-Patrick", "Dylin", "Dyllan", "Aaron"]
function GenerateAdmins(){
    for(let i=0; i<10; i++){
        var temp ={
            _id: "",
            firstName: firstName[i],
            lastName: lastName[i],
            phoneNumber: "6472251047",
            emailAddress: `${firstName[i]}@outlook.com`,
            password: "chigozie123",
            Points: 0,
            Reviews: [],
            PastOrders: []
        }
        AccountToCreate[i]=temp;
    }
}
GenerateAdmins();
let admin = new AdminAccount();
let employee = new EmployeeAccount();
let customer = new CustomerAccount();
let AdminInfo;

// AccountToCreate.forEach(async (element)=>{
//     await TestCreateAccount(element);});

await customer.GetAllCustomer("2748615975786023020114743AM").then(data=>{
    data.forEach(async (element) => {
        await customer.UseCustomersPoints(element._id)
    });
});


//await TestUpdateAccount();
//await TestLoginAccount();
//await TestDeleteAccount();

async function TestCreateAccount(account){
    return customer.CreateCustomer(account).then(()=>{
        AdminInfo = customer.GetCustomerInfo;
        console.log(`Admin Info: ${JSON.stringify(AdminInfo)}`);
    })
}

async function TestUpdateAccount(account){
    account.emailAddress = `${account.firstName}@hhrr.com`;
    account.password = "chigozie123";

    await customer.UpdateCustomer(account._id, account).then((data)=>{
        console.log(`Admin Info: ${JSON.stringify(data)}`);
    });
}

async function TestLoginAccount(account){
    let login = {
        EmailAddress: account.emailAddress,
        Password: "chigozie123"
    }
    await customer.CustomerLogin(login).then((data)=>{
        console.log(JSON.stringify(data));
    });
}
async function TestDeleteAccount(account){
    customer.DeleteCustomer(account._id);
}
