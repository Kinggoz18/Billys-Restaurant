//React Imports
import React from "react";
import {Link} from "react-router-dom";
//Jquery import
import  $  from "jquery";
//Css import
import './css/customer.css'

import profilePic from '../Images/profileLogo.png'
import {AddToStorage, GetFromStorage, RemoveFromStorage} from '../LocalStorage'
import { Accounts } from "../Objects/ObjectExports";

//Global Account Variable
let AccountData;
let CustomerAccount = new Accounts.CustomerAccount();

//Defaul customer home
export function CustomerNav(props){
    AccountData = LoadAccountInfo();
    return(<div>
        <div className="CustomerHome-Left">
            <img className="user-img" src={profilePic} alt="User Profile" />
            <span className="user-name">{AccountData['firstName']} {AccountData['lastName']}</span>
            <span className="user-pts">Points: {AccountData['points']} </span>
            <div>
                <Link to="/Account">Account Information</Link>
            </div>
            <div>
                <Link to="/Account/PastOrders">Past Orders</Link>
            </div>
            <div>
                <Link to="/Account/PastReviews">Past Reviews</Link>
            </div>
            <div>
                <Link to="/Login" onClick={()=>LogoutUser()}>Logout</Link>
            </div>
        </div>
    </div>)
}
//Account Info Tab
export function AccountInformation(props){
    return(<form id="user-form">
        <h1>Account Settings</h1>
        <div>
            <label htmlFor="user-firstName">First Name</label>
            <input id="user-firstName" type="text" placeholder={AccountData['firstName']}></input>
        </div>
        <div>
            <label htmlFor="user-lastName">Last Name</label>
            <input id="user-lastName" type="text" placeholder={AccountData['lastName']}></input>
        </div>
        <div>
            <label htmlFor="user-phone">Phone Number</label>
            <input id="user-phone" type="text" placeholder={AccountData['phoneNumber']}></input>
        </div>
        <div>
            <label htmlFor="user-email">Email Address</label>
            <input id="user-email" type="text" placeholder={AccountData['emailAddress']}></input>
        </div>
        <div id="user-passdiv">
            <label htmlFor="user-password">Password</label>
            <input id="user-password" type="text"></input>
            <span id="user-notification">Enter existing password or a new password to confrim account Update.</span>
        </div>
        <div id="user-updatebtn">
            <button onClick={()=>UpdateAccount()}>Update Account</button>
        </div>
        <div id="user-deteleAcc">
            <Link to="/" onClick={()=>DeleteAccount()}>Delete Account</Link>
        </div>
    </form>
    )
}
//Past Orders Tab
export function PastOrders(props){
    let pastOrders = AccountData['pastOrders'];
    return(<div className="user-pastOrders">
        <ul className="user-orders">
            {pastOrders.forEach(element => {
            $('.users-orders').append(`<li>${element}</li>`)})}
        </ul>
    </div>)
}
//Past Reviews Tab
export function PastReviews(props){
    let pastOrders = AccountData['pastOrders'];
    return(<div className="user-ReviewBox">
        <ul className="user-Reviews">
            {pastOrders.forEach(element => {
            $('.users-Reviews').append(`<li>${element}</li>`)})}
        </ul>
    </div>)
}
//Function to clear cookies and log user our
function LogoutUser(){
    RemoveFromStorage('AccountData');
}
//Functiont to get acount info from cookies
function LoadAccountInfo(){
    let Account = GetFromStorage('AccountData')
    if(Account!=null){
        return JSON.parse(Account);
    }
}
//Delete
async function DeleteAccount() {
    await CustomerAccount.DeleteCustomer(AccountData['_id']);
    RemoveFromStorage('AccountData');
}
//Update 
async function UpdateAccount(){
    let AccountInfo = {
        FirstName: document.querySelector('#user-firstName').value,
        LastName: document.querySelector('#user-lastName').value,
        PhoneNumber: document.querySelector('#user-phone').value,
        EmailAddress: document.querySelector('#user-email').value,
        Password: document.querySelector('#user-password').value
    }
    await CustomerAccount.UpdateCustomer(AccountData['_id'], AccountInfo);
    let result = CustomerAccount.GetCustomerInfo;
    if(result!=null){
        AddToStorage('AccountData', JSON.stringify(result));
        window.location.reload(); 
    }
    
}