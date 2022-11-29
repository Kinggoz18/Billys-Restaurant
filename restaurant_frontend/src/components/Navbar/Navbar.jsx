import React from 'react';
import './Navbar.css';

/*Navbar component */
export default function Navbar(props){
  return(
    <div>
        <nav className="app__navbar">
          <ul className=' app__navbar-links'>
          <li className='p__opensans hide' id ="home" onClick={()=>{props.onClick('Home')}}>Home</li>
            <li className='p__opensans' id ="menu" onClick={()=>{props.onClick('Menu')}}>Menu</li>
            <li className='p__opensans' id ="location" onClick={()=>{props.onClick('Location')}}>Location</li>
            <li className='p__opensans' id ="about" >About</li>
            <li className='p__opensans' id ="contact" onClick={()=>{props.onClick('ContactUs')}}>Contact us</li>
          </ul>
    <div className='app__navbar-right'>
        <p href="#login" className='p__opensans'><i className="fa fa-fw fa-user"></i>Login</p>
        <p href="#cart"className='p__opensans'><i className="fa fa-shopping-cart"></i>Cart</p>
      </div>
        </nav>
    </div>
  );
};
