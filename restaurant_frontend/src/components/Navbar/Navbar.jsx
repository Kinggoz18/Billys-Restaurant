import React from 'react';
import $ from 'jquery'
import './Navbar.css';
import navlogo from '../Images/DRM.png'
import { NavLink } from 'react-router-dom';
import {GetCurrentPage} from '../../rootLayout'
import { OrderComponent } from '../Order/Order';
/*Navbar component */
export default function Navbar(props){
  LoadDynamicNavbar();
  return(
    <div>
        <nav className="app__navbar">
        <div><img id="nav-logo"src={navlogo} alt="Nav Logo" /></div>
          <ul className=' app__navbar-links'>
            <li className='p__opensans hide' id ="home"><NavLink to="/">Home</NavLink></li>
            <li className='p__opensans' id ="menu" ><NavLink to="/Menu">Menu</NavLink></li>
            <li className='p__opensans' id ="location" ><NavLink to='/Location'>Location</NavLink></li>
            <li className='p__opensans' id ="about" ><NavLink to="/About">About</NavLink></li>
            <li className='p__opensans' id ="contact" ><NavLink to='/Contact'>Contact us</NavLink></li>
          </ul>
    <div className='app__navbar-right'>
        <p id="login"  className='p__opensans'><NavLink to='/Login'><i className="fa fa-fw fa-user"></i>Login</NavLink></p>
        <p id="cart"  className='p__opensans'><NavLink><OrderComponent></OrderComponent></NavLink></p>
      </div>
        </nav>
    </div>
  );
};

async function LoadDynamicNavbar(){
  const currentPage = GetCurrentPage();
  let CurrentPage = (currentPage===null)? null : currentPage.pathname;
    //Display every nav item
    $('#home').removeClass('hide');
    $('#menu').removeClass('hide');
    $('#location').removeClass('hide');
    $('#contact').removeClass('hide');
    $('#about').removeClass('hide');
    $('#login').removeClass('hide');
        //then use an if statement to filter them
    if(CurrentPage ===null || CurrentPage.length===1){
      $('#home').addClass('hide');
    }
    else{
      $('#home').removeClass('hide');
      if(CurrentPage.includes('Menu'))
      {
        $('#menu').addClass('hide');
      }
      else if(CurrentPage.includes('Location'))
      {
        $('#location').addClass('hide');
      }
      else if(CurrentPage.includes('Contact'))
      {
        $('#contact').addClass('hide');
      }
      else if(CurrentPage.includes('About'))
      {
        $('#about').addClass('hide');
      }
      else if(CurrentPage.includes('Account'))
      {
        $('#login').addClass('hide');
      }
    }}
