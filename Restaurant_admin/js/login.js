import { Accounts } from './Objects/ObjectExports.mjs';


let account = new Accounts.Account();

async function AccountCreate() {
    let LoginInfo = {
        emailAddress: document.getElementById('emailAddress').value,
        password: document.getElementById('password').value,
    }
    if(!emailaddress || !password){
        alert('Please enter all required fields.');
        return;
    }
    try{
        if(!ValidateLogin(LoginInfo))
        {
            return;
        }
        await account.LoginAccount(LoginInfo).then(() => {
            let result = account.GetAccountInfo;
            if(result!=null){
                AddToStorage('AccountData', JSON.stringify(result));
                this.setState({
                    AccountInfo: result,
                })
            }


        });

    }catch (error) {
        console.error(error);
        alert('Error logging in. Please try again later.');
    }

}