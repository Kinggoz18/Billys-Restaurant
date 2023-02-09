 /*======================================================================
| Login Component
|
| Name: Account.jsx
|
| Written by: Chigozie Muonagolu - Febuary 2023
|
| Purpose: React jsx file to act as a controller for other account components.
|
| usage: used in jsx files that requires it.
|
| Description of properties: None
|
|------------------------------------------------------------------
*/

import React from "react";
import  $  from "jquery";
import { Accounts } from "../Objects/ObjectExports";
import * as LoginComponents from './Login'
import * as CustomerComponents from './Customer'
let slideIndex = 0;

function LoadAccount(props){
    let Current = props.Current;
    if(Current === LoginComponents.Login){
        return(
            <Current AccountInfo={props.AccountInfo} LoginFunc={props.Login}></Current>)
    }
    else{
        return(<Current AccountInfo={props.AccountInfo}></Current>)
    }
}
//Controller for switching account components
export class AccountController extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            Current: LoginComponents.Login,
            AccountInfo: null,
        }
    }
    //Function to handle loggin in a user : Props for Login Components
    LoginUser = async (event)=>{
        event.preventDefault();
        let account = new Accounts.CustomerAccount();
        //prevent default action
        //Create credentials
        let loginCred = {
            EmailAddress: document.querySelector('#Login-Email').value,
            Password: document.querySelector('#Login-Password').value
        }
        await account.CustomerLogin(loginCred);
        let result = account.GetCustomerInfo;
        //Check result  
        if(result!=null){
            //set page to load the customers page, pass the results as props
            this.setState({
                Current: CustomerComponents.CustomerAccount,
                AccountInfo: result
        })
    }
    };
    //Function to handle Creating a user : Props for Login Components
    async CreateUser(event){
    event.preventDefault();
    let account = new Accounts.CustomerAccount();
    //prevent default action
    //Create credentials
    let AccountInfo = {
        FirstName: document.querySelector('#Reg-FirstName').value,
        LirstName: document.querySelector('#Reg-LastName').value,
        PhoneNumber: document.querySelector('#Reg-Phone').value,
        EmailAddress: document.querySelector('#Reg-Email').value,
        Password: document.querySelector('#Reg-Password').value
    }
    let self = this;
    await account.CreateCustomer(AccountInfo);
    let result = account.GetCustomerInfo;
    //Check result  
    if(result!=null){
        //set page to load the customers page, pass the results as props
        self.setState({
            Current: CustomerComponents.CustomerAccount,
            AccountInfo: result
        })
    }
    }
    //Returns the content loaded in Current
    render(){
        let create = this.CreateUser;
        let login = this.LoginUser;
        let LoginFuncs = {
            login: function(event){
                login(event);
            },
            create: function(event){
                create(event)
            }
        }
        return(<LoadAccount Current={this.state.Current} Login={LoginFuncs} AccountInfo={this.state.AccountInfo}></LoadAccount>);
    }
}