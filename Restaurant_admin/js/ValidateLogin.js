'use strict'
if(!IsInStorage('AccountData')){
    window.location.replace("../public/login.html");
}
else{
    let AccountData = JSON.parse(GetFromStorage('AccountData'));
    if(AccountData['_id'] === null){
        window.location.replace("../public/login.html");
    }
}