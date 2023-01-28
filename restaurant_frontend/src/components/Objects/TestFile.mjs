import { AdminAccount, EmployeeAccount, CustomerAccount} from './AccountObject.js';

TestAccounts();

function TestAccounts(){
    let admin = new AdminAccount();
    let AccountToCreate = {
        _id: {},
        FirstName: "Chigozie",
        LastName: "M",
        PhoneNumber: "6472251047",
        EmailAddress: "cmuonagolu@outlook.com",
        Password: "chigozie123"
    }
    admin.CreateAdmin(AccountToCreate);
}