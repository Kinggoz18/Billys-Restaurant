 /*======================================================================
| Login Component
|
| Name: Login.jsx
|
| Written by: Chigozie Muonagolu - Febuary 2023
|
| Purpose: React jsx file contaning login components.
|
| usage: used in jsx files that requires it.
|
| Description of properties: None
|
|------------------------------------------------------------------
*/
import React from "react";
import logo from '../Images/logo.png'
import {GetFromStorage, IsInStorage, AddToStorage} from '../LocalStorage'
import{Navigate} from 'react-router-dom'
import './css/login.css'
import $ from 'jquery'
import { Accounts } from "../Objects/ObjectExports";

let slideIndex;

function Header(props){
    return(
    <div className="promoHeader">
        <img src={logo} alt="Drum Rock Jerk Logo" className="logoImg"></img>
        <h1 className="title">{props.title}</h1>
    </div>)
}
function RegisterBox(props){
    return(
        <div className="registerBox">
            <div className="PromoSection">
            </div>
            <form>
                <Header title="Create your Account"></Header>
                <span id="Reg-Invalid" className='error'>An error occurred, please try with a different email.</span>
                <div>
                    <label htmlFor="Reg-FirstName">First Name</label>
                    <input type="text" id="Reg-FirstName" placeholder="Enter first name"></input>
                    <span id="Reg-FirstNameErr" className='error'>Please enter your first name.</span>
                </div>
                <div>
                    <label htmlFor="Reg-LastName">Last Name</label>
                    <input type="text" id="Reg-LastName" placeholder="Enter first name"></input>
                    <span id="Reg-LastNameErr" className='error'>Please enter your last name.</span>
                </div>
                <div>
                    <label htmlFor="Reg-Email">Email Address</label>
                    <input type="text" id="Reg-Email" placeholder="Enter email"></input>
                    <span id ='Reg-EmailAddressErr' className='error'>Please enter a valid email address.</span>
                </div>
                <div>
                    <label htmlFor="Reg-Password">Password</label>
                    <input type="password" id="Reg-Password" placeholder="Enter password"></input>
                    <span id ='Reg-PasswordErr' className='error'>Please enter a password.</span>
                </div>
                <div>
                    <label htmlFor="Reg-ConfPassword">Confrim Password</label>
                    <input type="password" id="Reg-ConfPassword" placeholder="Enter password"></input>
                    <span id ='Reg-ConPasswordErr' className='error'>Passwords do not match.</span>
                </div>
                <div>
                    <label htmlFor="Reg-Phone">Phone</label>
                    <input type="text" id="Reg-Phone" placeholder="___ ___ ___"></input>
                    <span id ='Reg-PhoneErr' className='error'>Please enter a valid Phone number.</span>
                </div>
                <div style={{display: "flex"}}>
                    <button className="reg-login-btn" onClick={(event)=>props.LoginFunc.create(event)}>Create Account</button>
                </div>
                <div style={{display: "flex"}}><p>Already have an account? <span className="swap-box" onClick={()=>props.onClick("Login")}>login</span></p></div>
            </form>
        </div>
    )
}

function LoginBox(props){
    return(<div className="loginBox">
        <div className="PromoSection">
            </div>
        <form>
            <Header title="Login now"></Header>
            <span id="Reg-Invalid" className='error'>Invalid login credentials entered</span>
            <div>
                <label htmlFor="Login-Email">Email Address</label>
                <input type="email" id="Login-Email" placeholder="Enter email"></input>
                <span id="Login-EmailErr" className='error'>Please enter a valid email.</span>
            </div>
            <div>
                <label htmlFor="Login-FirstName">Password</label>
                <input type="password" id="Login-Password" placeholder="Enter password"></input>
                <span id="Login-PasswordErr" className='error'>Invalid password. Please enter a valid password.</span>
            </div>
            <div style={{display: "flex"}}>
                <button className="reg-login-btn" onClick={(event)=>props.LoginFunc.login(event)}>Login</button>
            </div>
            <div style={{display: "flex"}}><p>Don't have an account? <span className="swap-box" onClick={()=>props.onClick("Register")}>Create one now.</span></p></div>
        </form>
    </div>)
}
//function to handle switching between login and Register
function ToggleBox(props){
    let Current = props.current;
    return(
        <Current onClick={props.onClick} LoginFunc={props.LoginFunc} AccountInfo={props.AccountInfo}></Current>
    )
}
//Onclick function to set current box
function LoadSlides(i){
    if(i === "Login")
    {
        slideIndex = 0;
    }
    else if(i === "Register")
    {
        slideIndex = 1;
    }
}
//The main login/registeration components
export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            slides: [LoginBox, RegisterBox],
            current: RegisterBox,
            AccountInfo: null
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
        await account.CustomerLogin(loginCred).then(()=>{
            let result = account.GetCustomerInfo;
            //Check result  
            if(result!=null){
                AddToStorage('AccountData', JSON.stringify(result));
                this.setState({
                    AccountInfo: result,
                })
            }
            else{
                $('#Reg-Invalid').addClass('form-show')
            }
        });
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
    await account.CreateCustomer(AccountInfo).then(()=>{
        let result = account.GetCustomerInfo;
        //Check result  
        if(result!=null){
            AddToStorage('AccountData', JSON.stringify(result));
            this.setState({
                AccountInfo: result,
            })
        }
        else{
            $('#Reg-Invalid').addClass('form-show')
        }
    });
    }
    LoadBox(i){
        LoadSlides(i);
        this.setState({
            current: this.state.slides[slideIndex]
        });
    }
    render(){
        let create = this.CreateUser;
        let login = this.LoginUser;
        let LoginFunc ={
            create: function(event){
                create(event);
            },
            login: function(event){
                login(event);
            }
        }
        //If AccountData cookie exists
        console.log(IsInStorage('AccountData'))
        if(IsInStorage('AccountData')){
            return(
                <Navigate to="/Account"/>
            )
        }
        else{
            return(
                <div className="login-Section">
                    <ToggleBox current={this.state.current} onClick={(i)=>this.LoadBox(i)} LoginFunc={LoginFunc} AccountInfo={this.state.AccountInfo}/>
                </div>
            )
        }
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
        $('#Login-PasswordErr').addClass('form-show');
        valid = (valid === true)? false : valid;
    }
    //Validate email
    if(loginCred['EmailAddress']==="" ||loginCred['EmailAddress']===null || loginCred['EmailAddress']===undefined){
        $('#Login-EmailErr').addClass('form-show');
        return false;
    }
    else if(!ValidateEmail(loginCred['EmailAddress'])){
        $('#Login-EmailErr').addClass('form-show');
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

//Function to check confirm password matches enetred password
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

