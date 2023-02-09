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
                    <label htmlFor="Reg-Email">Email Address</label>
                    <input type="text" id="Reg-Email" placeholder="Enter email"></input>
                </div>
                <div>
                    <label htmlFor="Reg-Password">Password</label>
                    <input type="password" id="Reg-Password" placeholder="Enter password"></input>
                </div>
                <div>
                    <label htmlFor="Reg-Phone">Phone</label>
                    <input type="text" id="Reg-Phone" placeholder="___ ___ ___"></input>
                </div>
                <div>
                    <button className="reg-login-btn" onClick={(event)=>props.LoginFunc.create(event)}>Create Account</button>
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
                <button className="reg-login-btn" onClick={(event)=>props.LoginFunc.login(event)}>Login</button>
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
    LoadBox(i){
        LoadSlides(i);
        this.setState({
            current: this.state.slides[slideIndex]
        });
    }
    render(){
        return(
            <div className="login-Section">
                <ToggleBox current={this.state.current} onClick={(i)=>this.LoadBox(i)} LoginFunc={this.props.LoginFunc}/>
            </div>
        )
    }
}