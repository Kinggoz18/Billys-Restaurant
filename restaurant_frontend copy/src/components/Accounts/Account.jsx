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
import { CustomerAccount } from "./Customer";
let slideIndex = 0;

function LoadAccount(props){
    //if an exitsting login exists
    if(props.AccountInfo!=null){
        return(<CustomerAccount AccountInfo={props.AccountInfo} AccountData={props.AccountData}></CustomerAccount>)
    }
    let Current = props.Current;
    if(Current === LoginComponents.Login){
        return(
            <Current AccountInfo={props.AccountInfo} LoginFunc={props.Login} AccountData={props.AccountData}></Current>)
    }
    else{
        return(<Current AccountInfo={props.AccountInfo} AccountData={props.AccountData}></Current>)
    }
}
//Controller for switching account components
export class AccountController extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            Current: LoginComponents.Login,
            AccountInfo: props.AccountData['AccountInfo'],
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
        if(!ValidateLogin(loginCred))
        {
            return;
        }
        await account.CustomerLogin(loginCred);
        let result = account.GetCustomerInfo;
        //Check result  
        if(result!=null){
            //Pass the account information back to the parent
            this.props.AccountData.GetAccountInfo(result);
            //set page to load the customers page, pass the results as props
            this.setState({
                Current: CustomerAccount,
                AccountInfo: result
        })
    }
    };
    //Function to handle Creating a user : Props for Login Components
    CreateUser = async(event)=>{
    event.preventDefault();
    let account = new Accounts.CustomerAccount();
    //prevent default action
    //Create credentials
    let AccountInfo = {
        FirstName: document.querySelector('#Reg-FirstName').value,
        LastName: document.querySelector('#Reg-LastName').value,
        PhoneNumber: document.querySelector('#Reg-Phone').value,
        EmailAddress: document.querySelector('#Reg-Email').value,
        Password: document.querySelector('#Reg-Password').value
    }
    if(!ValidateCreate(AccountInfo))
    {
        return;
    }
    await account.CreateCustomer(AccountInfo);
    let result = account.GetCustomerInfo;
    //Check result  
    if(result!=null){
        //Pass the account information back to the parent
        this.props.AccountData.GetAccountInfo(result);
        //set page to load the customers page, pass the results as props
        this.setState({
            Current: CustomerAccount,
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
        return(<LoadAccount Current={this.state.Current} Login={LoginFuncs} AccountInfo={this.state.AccountInfo} AccountData={this.props.AccountData}></LoadAccount>);
    }
}
/****************** Utility Functions  ***********************/
//Function to validate phone number
function ValidateEmail(email){
    var mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mail.test(email)) {
        return true;
    }
    else {
        return false;
    }
}
//Function to validate phone number
function validatePhone(phone) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(phone);
}
//Function to validate login details

function ValidateLogin(loginCred){
    let valid = true;
    //Validate passowrd
    if(loginCred['Password']==="" ||loginCred['Password']===null || loginCred['Password']===undefined){
        $('#Login-Password').addClass('form-show');
        valid = (valid === true)? false : valid;
    }
    //Validate email
    if(loginCred['EmailAddress']==="" ||loginCred['EmailAddress']===null || loginCred['EmailAddress']===undefined){
        $('#Login-Email').addClass('form-show');
        return false;
    }
    else if(!ValidateEmail(loginCred['EmailAddress'])){
        $('#Login-Email').addClass('form-show');
        valid = (valid === true)? false : valid;
    }
    return valid;
}
//Function to validate validate
function ValidateCreate(AccountInfo){
    let valid = true;

    //Validate first name
    if(AccountInfo['FirstName']==="" ||AccountInfo['FirstName']===null || AccountInfo['FirstName']===undefined){
        $('#Reg-FirstNameErr').addClass('form-show');
        valid = (valid === true)? false : valid;
    }
    else{
        $('#Reg-FirstNameErr').removeClass('form-show');
    }
    //Validate last name
    if(AccountInfo['LastName']==="" ||AccountInfo['LastName']===null || AccountInfo['LastName']===undefined){
        $('#Reg-LastNameErr').addClass('form-show');
        valid = (valid === true)? false : valid;
    }
    else{
        $('#Reg-LastNameErr').removeClass('form-show');
    }
    //Validate phone
    if(AccountInfo['PhoneNumber']==="" ||AccountInfo['PhoneNumber']===null || AccountInfo['PhoneNumber']===undefined){
        $('#Reg-PhoneErr').addClass('form-show');
        valid = (valid === true)? false : valid;
    }
    else if(!validatePhone(AccountInfo['PhoneNumber'])){
        $('#Reg-PhoneErr').addClass('form-show');
        valid = (valid === true)? false : valid;
    }
    else{
        $('#Reg-PhoneErr').removeClass('form-show');
    }
    //Validate email
    if(AccountInfo['EmailAddress']==="" ||AccountInfo['EmailAddress']===null || AccountInfo['EmailAddress']===undefined){
        $('#Reg-EmailAddressErr').addClass('form-show');
        valid = (valid === true)? false : valid;
    }
    else if(!ValidateEmail(AccountInfo['EmailAddress'])){
        $('#Reg-EmailAddressErr').addClass('form-show');
        valid = (valid === true)? false : valid;
    }
    else{
        $('#Reg-EmailAddressErr').removeClass('form-show');
    }
    //Validate passowrd
    if(AccountInfo['Password']==="" ||AccountInfo['Password']===null || AccountInfo['Password']===undefined){
        $('#Reg-PasswordErr').addClass('form-show');
        valid = (valid === true)? false : valid;
    }
    else{
        $('#Reg-PasswordErr').removeClass('form-show');
        valid = (ValidateConfrimPassword(AccountInfo['Password']) === false)? false : valid;
    }
    return valid
}

function ValidateConfrimPassword(password){
    let passInput = document.querySelector('#Reg-ConfPassword');
    if(passInput.value!==password)
    {
        $('#Reg-ConPasswordErr').addClass('form-show')
        return false;
    }
    else{
        $('#Reg-ConPasswordErr').removeClass('form-show')
        return true
    }
}