import React from "react";
import  $  from "jquery";
import './css/customer.css'
import profilePic from '../Images/profileLogo.png'
import { Accounts } from "../Objects/ObjectExports";
//Defaul customer home
function CustomerNav(props){
    return(<div>
        <div className="CustomerHome-Left">
            <img className="user-img" src={profilePic} alt="User Profile" />
            <span className="user-name">{props.AccountInfo["firstName"]} {props.AccountInfo["lastName"]}</span>
            <span className="user-pts">Points: {props.AccountInfo['points']}</span>
            <div>
                <span>Account Information</span>
            </div>
            <div>
                <span>Past Orders</span>
            </div>
            <div>
                <span>Past Reviews</span>
            </div>
            <div>
                <span onClick={(event)=>{props.SwitchTab(event, 'Logout')}}>Logout</span>
            </div>
        </div>
    </div>)
}
//Account Info Tab
function AccountInformation(props){
    return(<form id="user-form">
        <h1>Account Settings</h1>
        <div>
            <label htmlFor="user-firstName">First Name</label>
            <input id="user-firstName" type="text" placeholder={props.AccountInfo['firstName']}></input>
        </div>
        <div>
            <label htmlFor="user-lastName">Last Name</label>
            <input id="user-lastName" type="text" placeholder={props.AccountInfo['lastName']}></input>
        </div>
        <div>
            <label htmlFor="user-phone">Phone Number</label>
            <input id="user-phone" type="text" placeholder={props.AccountInfo['phoneNumber']}></input>
        </div>
        <div>
            <label htmlFor="user-email">Email Address</label>
            <input id="user-email" type="text" placeholder={props.AccountInfo['emailAddress']}></input>
        </div>
        <div id="user-passdiv">
            <label htmlFor="user-password">Password</label>
            <input id="user-password" type="text"></input>
            <span id="user-notification">Enter existing password or a new password to confrim account Update.</span>
        </div>
        <div id="user-updatebtn">
            <button>Update Account</button>
        </div>
        <div id="user-deteleAcc">
            <button>Delete Account</button>
        </div>
    </form>
    )
}
//Past Orders Tab
function PastOrders(props){
    let pastOrders = props.AccountInfo['pastOrders'];
    return(<div className="user-pastOrders">
        <ul className="user-orders">
            {pastOrders.forEach(element => {
            $('.users-orders').append(`<li>${element}</li>`)})}
        </ul>
    </div>)
}
//Past Reviews Tab
function PastReviews(props){
    let pastOrders = props.AccountInfo['Reviews'];
    return(<div className="user-ReviewBox">
        <ul className="user-Reviews">
            {pastOrders.forEach(element => {
            $('.users-Reviews').append(`<li>${element}</li>`)})}
        </ul>
    </div>)
}
//Controller for account components
function LoadCustomerComponent(props){
    let Current = props.Current;
    return(
        <div className="user-home">
            <CustomerNav AccountInfo={props.AccountInfo} SwitchTab={(event, section)=>props.SwitchTab(event, section)}></CustomerNav>
            <Current AccountInfo={props.AccountInfo}></Current>
        </div>
    );
}

//Controller for customer account components
export class CustomerAccount extends React.Component{
    constructor(props){
        super(props);
        this.state={
            AccountInfo: this.props.AccountInfo,
            Current: AccountInformation
        }
    }
    SwicthUserComponents(event, section){
        event.preventDefault();
        if(section === 'AccountInformation'){
            this.setState({Current: AccountInformation})
        }
        else if(section === 'PastOrders'){
            this.setState({Current: PastOrders})
        }
        else if(section === 'PastReviews'){
            this.setState({Current: PastReviews})
        }
        else if( section === 'Logout'){
            this.props.AccountData.GetAccountInfo(null);
        }
    }
    render(){
        return(<LoadCustomerComponent Current={this.state.Current} AccountInfo={this.state.AccountInfo} SwitchTab={(event, section)=>this.SwicthUserComponents(event, section)}></LoadCustomerComponent>)
    }

}