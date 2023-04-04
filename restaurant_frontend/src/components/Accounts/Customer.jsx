//React Imports
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
//Jquery import
import  $  from "jquery";
//Css import
import './css/customer.css'

import profilePic from '../Images/profileLogo.png'
import {AddToStorage, GetFromStorage, RemoveFromStorage} from '../LocalStorage'
import { Accounts, Order } from "../Objects/ObjectExports";
import {Loading} from '../LoadingIcon'

//Global Account Variable
let AccountData;
let CustomerAccount = new Accounts.CustomerAccount();
let OrderObj = new Order();
let isNavOpen = false;

//Defaul customer home
export function CustomerNav(props){
    AccountData = LoadAccountInfo();
    GetPastOrders();
    //Functiont to toggle mobile nav
    function ToggleMobileNav(){
      if(!isNavOpen){
        $('.CustomerHome-Left').addClass('display-user-accountNav');
        setTimeout(()=>{
          $('.account-nav').css('display', 'flex');
        }, 700);
        isNavOpen = true;
      }else{
        $('.account-nav').css('display', 'none');
        $('.CustomerHome-Left').removeClass('display-user-accountNav');
        isNavOpen = false;
      }
    }
    return(
        <div className="CustomerHome-Left">
            <span className="Toggle-user-accountNav"><i  onClick = {()=>ToggleMobileNav()} class="fa-solid fa-arrow-right-from-bracket"></i></span>
            <div className="account-nav">
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
                <Link to="/Login" onClick={()=>LogoutUser()}>Logout</Link>
            </div>
            </div>
        </div>
    )
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
            <span id="user-passError" className="error">Please enter your password to confrim update</span>
            <span id="user-notification">Confrim with existing password or a new password to confrim account Update.</span>
        </div>
        <div id="user-updatebtn">
            <button onClick={(event)=>UpdateAccount(event)}>Update Account</button>
        </div>
        <div id="user-deteleAcc">
            <Link to="/" onClick={()=>DeleteAccount()}>Delete Account</Link>
        </div>
    </form>
    )
}
//Past Orders Tab
export function PastOrders(props) {
  const [pastOrders, setPastOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await GetPastOrders();
        let data = AccountData["pastOrders"];
        if (data) {
          setPastOrders(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    }, []);

  if (loading) {
    return(
      <div className="user-pastOrders">
      <Loading/>
    </div>
    )
  }

  if (pastOrders!=null) {
    const orderList = pastOrders.map((order, index) => (
      <div key={index} className="order-item">
        <div className="order-details">
          <div>Order ID: {order._id}</div>
          <div>Date: {order.date}</div>
          <div>Total Price: {order.totalPrice}</div>
        </div>
        <div className="order-items">
          <h4>Order Items</h4>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ));

    return (
      <div className="user-pastOrders">
        <h2>Past Orders</h2>
        <div className="order-list">{orderList}</div>
      </div>
    );
  }

  return <div>No past orders found.</div>;
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
    $('#user-passError').removeClass('show');
}
//Delete
async function DeleteAccount() {
    await CustomerAccount.DeleteCustomer(AccountData['_id']);
    RemoveFromStorage('AccountData');
}
//Update 
async function UpdateAccount(event){
    event.preventDefault();
    let firstname = document.querySelector('#user-firstName').value;
    let lastname = document.querySelector('#user-lastName').value;
    let phonenumber = document.querySelector('#user-phone').value;
    let emailaddress = document.querySelector('#user-email').value;
    let password = document.querySelector('#user-password').value;

    if(password!==""){
        //If any of account info is null use the data from the storage
        let AccountInfo = {
            firstName: (firstname === "")? AccountData['firstName'] : firstname,
            lastName: (lastname === "")? AccountData['lastName'] : lastname,
            phoneNumber: (phonenumber === "")? AccountData['phoneNumber'] : phonenumber,
            emailAddress: (emailaddress === "")? AccountData['emailAddress'] : emailaddress,
            password: password
        }
        let temp = ReturnBody(AccountInfo);    
        await CustomerAccount.UpdateCustomer(AccountData['_id'], temp).then(()=>{
            let result = CustomerAccount.GetCustomerInfo;
            if(result!=null){
                AddToStorage('AccountData', JSON.stringify(result));
                window.location.reload(); 
            }
        });
    }
    else{
        $('#user-passError').addClass('show');
    }
    
}
function ReturnBody(AccountData)
{
    return {
        _id: "string",
        firstName: AccountData.firstName,
        lastName: AccountData.lastName,
        phoneNumber: AccountData.phoneNumber,
        emailAddress: AccountData.emailAddress,
        password: AccountData.password,
        points: 0,
        reviews: [
          {
            _id: "string",
            description: "string",
            rating: 0,
            name: "string",
            userId: "string"
          }
        ],
        pastOrders: [
          {
            _id: "string",
            customerEmail: "string",
            customerName: "string",
            phoneNumber: "string",
            items: [
              {
                _id: "string",
                name: "string",
                price: 0,
                menu: "string",
                orderCount: 0,
                imageLink: "string"
              }
            ],
            orderdate: "string",
            status: "string",
            totalPrice: 0
          }
        ]
      }
}

async function GetPastOrders(){
    let email = AccountData['emailAddress'];
    AccountData['pastOrders'] = await OrderObj.GetAllOrdersByEmail(email);
}