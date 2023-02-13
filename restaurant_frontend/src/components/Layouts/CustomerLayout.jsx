import React from "react";
import { Outlet } from "react-router-dom";
import {CustomerNav} from '../Accounts/Customer'
import './css/AccountLayout.css'
export class CustomerLayout extends React.Component{
    render(){
      return(
          <div className="user-home">
            <CustomerNav/>
            <Outlet/>
          </div>
      );
    }
}