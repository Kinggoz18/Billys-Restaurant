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
import  $  from "jquery";
import React from "react";
import logo from '../Images/logo.png'
import { Accounts } from "../Objects/ObjectExports";
import './css/login.css'

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
                <div>
                    <label htmlFor="Reg-FirstName">First Name</label>
                    <input type="text" id="Reg-FirstName" placeholder="Enter first name"></input>
                </div>
                <div>
                    <label htmlFor="Reg-LastName">Last Name</label>
                    <input type="text" id="Reg-LastName" placeholder="Enter first name"></input>
                </div>
                <div>
                    <label htmlFor="Login-Email">Email Address</label>
                    <input type="text" id="Login-Email" placeholder="Enter email"></input>
                </div>
                <div>
                    <label htmlFor="Reg-Password">Password</label>
                    <input type="password" id="Reg-Password" placeholder="Enter password"></input>
                </div>
                <div>
                    <button className="reg-login-btn">Create Account</button>
                </div>
                <div><p>Already have an account? <span className="swap-box" onClick={()=>props.onClick("Login")}>login</span></p></div>
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
            <div>
                <label htmlFor="Login-Email">Email Address</label>
                <input type="email" id="Login-Email" placeholder="Enter email"></input>
            </div>
            <div>
                <label htmlFor="Login-FirstName">Password</label>
                <input type="password" id="Login-Password" placeholder="Enter password"></input>
            </div>
            <div>
                <button className="reg-login-btn" onClick={(event)=>props.LoginFunc(event)}>Login</button>
            </div>
            <div><p>Don't have an account? <span className="swap-box" onClick={()=>props.onClick("Register")}>Create one now.</span></p></div>
        </form>
    </div>)
}
//Class to handle switching between login and Register
class ToggleBox extends React.Component{
    render(){
        let Current = this.props.current;
        return(
            <Current onClick={this.props.onClick} LoginFunc={this.props.LoginFunc}></Current>
        )
    }
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
            current: RegisterBox
        }
    }
    async LoginUser(event){
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
                console.log(JSON.stringify(result));
                //set page to load the customers page, pass the results as props
            }
        }
    LoadBox(i){
        LoadSlides(i);
        this.setState({
            current: this.state.slides[slideIndex]
        });
    }
    render(){
        return(
            <div className="login-Section">
                <ToggleBox current={this.state.current} onClick={(i)=>this.LoadBox(i)} LoginFunc={(event)=>this.LoginUser(event)}/>
            </div>
        )
    }
}