import { AdminAccount, EmployeeAccount, CustomerAccount} from './AccountObject.js';
let AccountToCreate = {
    _id: {},
    firstName: "Chigozie",
    lastName: "M",
    phoneNumber: "6472251047",
    emailAddress: "cmuonagolu@outlook.com",
    password: "chigozie123"
}
let admin = new AdminAccount();
let employee = new EmployeeAccount();
let customer = new EmployeeAccount();
let AdminInfo;

await TestCreateAccount();
await TestUpdateAccount();
//TestLoginAccount();
//TestDeleteAccount();

async function TestCreateAccount(){
    return admin.CreateAdmin(AccountToCreate).then(()=>{
        AdminInfo = admin.GetAdminInfo;
        //console.log(`Admin Info: ${JSON.stringify(AdminInfo)}`);
    })
}

async function TestUpdateAccount(){
    return admin.UpdateAdmin(AdminInfo).then(()=>{
        AdminInfo._id = "63c9c5a9c46657c2c5ad0ff7";
        AdminInfo = admin.GetAdminInfo;
        //console.log(`Admin Info: ${JSON.stringify(AdminInfo)}`);
    });
}
async function TestLoginAccount(){
    let login = {
        EmailAddress: AccountToCreate.EmailAddress,
        Password: AccountToCreate.Password
    }
    let loginResult = await admin.AdminLogin(login);
    console.log(JSON.stringify(loginResult));
}
async function TestDeleteAccount(){
    admin.DeleteAdmin(AdminInfo._id);
}
