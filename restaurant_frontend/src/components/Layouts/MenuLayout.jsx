import React from "react";
import { Outlet } from "react-router-dom";
import { MenuNav } from '../Menu/Menu'
import './css/MenuLayout.css'
export class MenuLayout extends React.Component{
    render(){
      return(
        <div className='Page'>
            <MenuNav/>
            <Outlet/>
        </div>
      );
    }
}